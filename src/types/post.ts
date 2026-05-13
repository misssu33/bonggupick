/** Supabase `posts` 테이블과 맞춘 칼럼 타입 */
export type Category = "daily" | "it" | "support";

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: Category;
  tags: string[] | null;
  thumbnail_url: string | null;
  reading_time: number;
  view_count: number;
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
