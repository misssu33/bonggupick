import { CategoryNav } from "@/components/home/CategoryNav";
import { Hero } from "@/components/home/Hero";
import { LatestPosts } from "@/components/home/LatestPosts";
import { PickOfWeek } from "@/components/home/PickOfWeek";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getFeaturedPost, getLatestPosts } from "@/lib/posts";

export default async function Home() {
  const featuredPost = await getFeaturedPost();
  const latestPosts = await getLatestPosts(6);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {featuredPost ? <PickOfWeek post={featuredPost} /> : null}
        <LatestPosts posts={latestPosts} />
        <CategoryNav />
      </main>
      <Footer />
    </div>
  );
}
