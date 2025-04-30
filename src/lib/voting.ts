import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { RealtimeChannel } from '@supabase/supabase-js';

// Rate limiting constants
const RATE_LIMIT_SECONDS = 10;

// Types for vote counting
interface VoteCount {
  product_id: string;
  vote_count: number;
}

interface VoteCountsResponse {
  data: VoteCount[];
  error: string | null;
  totalVotes: number;
}

export const getOrCreateVoterId = (): string => {
  const key = 'voter_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(key, id);
  }
  return id;
};

export function isRateLimited(): boolean {
  const lastVote = Number(localStorage.getItem('last_vote_time'));
  return Date.now() - lastVote < RATE_LIMIT_SECONDS * 1000;
}

export function updateLastVoteTime(): void {
  localStorage.setItem('last_vote_time', Date.now().toString());
}

interface VoteParams {
  productId: string;
  weekId: string;
  metadata?: Record<string, any>;
}

// Core vote submission function
const submitVoteCore = async ({
  productId,
  weekId,
  metadata = {},
}: VoteParams): Promise<{ success: boolean; error?: string }> => {
  const voterId = getOrCreateVoterId();

  const { error } = await supabase.from('votes').insert({
    product_id: productId,
    week_id: weekId,
    voter_id: voterId,
    metadata,
    created_at: new Date().toISOString(),
  });

  if (error) {
    if (error.code === '23505' || error.message?.includes('duplicate')) {
      return {
        success: false,
        error: "You have already voted in this week's battle",
      };
    }

    console.error('Vote error:', error);
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }

  return { success: true };
};

// Throttled vote submission function
export const submitVote = async (params: VoteParams): Promise<{ success: boolean; error?: string }> => {
  if (isRateLimited()) {
    return {
      success: false,
      error: "Just a moment - let's give others a chance to vote too 😊",
    };
  }

  const result = await submitVoteCore(params);
  if (result.success) {
    updateLastVoteTime();
  }
  return result;
};

export const subscribeToVotes = (weekId: string, callback: () => void): RealtimeChannel => {
  return supabase
    .channel(`votes-${weekId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'votes', filter: `week_id=eq.${weekId}` },
      callback
    )
    .subscribe();
};

/**
 * Gets the vote counts for all products in a specific week
 * @param weekId - The ID of the week to get vote counts for
 * @returns Promise<VoteCountsResponse> - The vote counts grouped by product
 */
export const getVoteCountsByProduct = async (weekId: string): Promise<VoteCountsResponse> => {
  try {
    const { data, error } = await supabase
      .from('votes')
      .select('product_id')
      .eq('week_id', weekId);

    if (error) {
      console.error('Error fetching vote counts:', error);
      return {
        data: [],
        error: 'Failed to fetch vote counts',
        totalVotes: 0
      };
    }

    if (!data || data.length === 0) {
      return {
        data: [],
        error: null,
        totalVotes: 0
      };
    }

    // Count votes by product
    const voteCounts = data.reduce((acc: { [key: string]: number }, vote) => {
      if (vote.product_id) {
        acc[vote.product_id] = (acc[vote.product_id] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert to array format
    const voteCountArray: VoteCount[] = Object.entries(voteCounts).map(([product_id, vote_count]) => ({
      product_id,
      vote_count
    }));

    return {
      data: voteCountArray,
      error: null,
      totalVotes: data.length
    };
  } catch (err) {
    console.error('Unexpected error fetching vote counts:', err);
    return {
      data: [],
      error: 'An unexpected error occurred',
      totalVotes: 0
    };
  }
}; 