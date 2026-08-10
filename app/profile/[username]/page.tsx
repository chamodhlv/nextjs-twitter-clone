import { getProfileByUsername } from "@/actions/Profile.action";

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

function ProfilePage({ params }: { params: { username: string } }) {
  return <div>page</div>;
}

export default ProfilePage;
