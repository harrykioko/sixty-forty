import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { RealtimeChannel } from '@supabase/supabase-js';

export const getOrCreateVoterId = (): string => {
  const key = 'voter_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(key, id);
  }
  return id;
};

interface VoteParams {
  productId: string;
  weekId: string;
  metadata?: Record<string, any>;
}

export const submitVote = async ({
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