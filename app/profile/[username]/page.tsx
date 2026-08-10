import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/Profile.action";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const user = await getProfileByUsername(params.username);

  if (!user) return;

  return {
    title: `${user.name} (@${user.username})`,
    description: user.bio || `Check out ${user.name}'s profile on Twitter.`,
  };
}

async function ProfilePage({ params }: { params: { username: string } }) {
  const user = await getProfileByUsername(params.username);

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return <div>page</div>;
}

export default ProfilePage;
