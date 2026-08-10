import { currentUser } from "@clerk/nextjs/server";
import CreatePosts from "@/components/CreatePost";
import FollowerRecommendation from "@/components/FollowerRecommendation";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = user ? await getDbUserId() : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePosts /> : null}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4">
        <FollowerRecommendation />
      </div>
    </div>
  );
}
