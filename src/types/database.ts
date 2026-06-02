/** Supabase `categories` 테이블 */
export interface DbCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  emoji: string | null;
  sort_order: number | null;
  created_at?: string;
  updated_at?: string;
}

/** Supabase `posts` + categories 조인 */
export interface DbPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category_id: string | null;
  /** 레거시: category slug 문자열 컬럼이 남아 있을 수 있음 */
  category?: string | null;
  status: string;
  is_featured: boolean;
  published_at: string | null;
  thumbnail_url: string | null;
  reading_time: number | null;
  view_count: number | null;
  tags: unknown;
  created_at: string;
  updated_at: string;
  categories?: DbCategory | DbCategory[] | null;
}

/** Supabase `resources` 테이블 */
export type ResourceType = "template" | "tool" | string;

export interface DbResource {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  resource_type: ResourceType;
  external_url: string | null;
  status: string;
  tag: string | null;
  sort_order: number | null;
  category_id: string | null;
  created_at?: string;
  updated_at?: string;
  categories?: DbCategory | DbCategory[] | null;
}

/** 앱에서 사용하는 정규화 타입 */
export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  emoji: string;
  sortOrder: number;
}

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
  status: string;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string | null;
  resource_type: ResourceType;
  external_url: string | null;
  tag: string;
  sortOrder: number;
  category: Category | null;
}
