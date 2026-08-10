import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { getUserByClerkId } from "@/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getProfileByUsername(username);

  if (!user) return;

  return {
    title: `${user.name} (@${user.username})`,
    description: user.bio || `Check out ${user.name}'s profile on Twitter.`,
  };
}

async function ProfilePageServer({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getProfileByUsername(username);

  if (!user) notFound();

  const { userId: clerkId } = await auth();
  const currentUser = clerkId ? await getUserByClerkId(clerkId) : null;
  const currentDbUserId = currentUser?.id ?? null;

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
      currentDbUserId={currentDbUserId}
    />
  );
}

export default ProfilePageServer;

