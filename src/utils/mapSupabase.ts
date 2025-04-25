import { Product, Week } from "@/types/admin";

export function mapSupabaseProduct(p: any): Product {
  return {
    id: p.id,
    title: p.name || '',
    builderName: p.builders?.name || '',
    image: p.image_url || '',
    shortDescription: p.short_desc || '',
    description: p.long_desc || '',
    techStack: p.tech_stack || [],
    features: p.features || [],
    votes: p.votes || 0,
    pricing: p.pricing,
    demoLink: p.demo_url,
    builderNotes: p.builder_notes,
    additionalImages: [],
    week_id: p.week_id
  };
}

export function mapSupabaseWeek(w: any): Week {
  return {
    id: w.id,
    number: w.number,
    startDate: new Date(w.start_date),
    endDate: new Date(w.end_date),
    status: w.status,
    winnerId: w.winner_id,
    winnerName: w.winner_name ?? null,
    products: w.products ? w.products.map(mapSupabaseProduct) : [],
    theme: w.theme,
    totalVotes: w.total_votes,
    created_at: w.created_at
  };
}
