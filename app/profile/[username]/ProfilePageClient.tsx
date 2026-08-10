"use client";

import { getProfileByUsername, getUserPosts } from "@/actions/profile.action";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { updateProfile } from "@/actions/profile.action";
import { toast } from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";

type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Post = Awaited<ReturnType<typeof getUserPosts>>;

interface ProfilePageClientProps {
  user: NonNullable<User>;
  posts: Post;
  likedPosts: Post;
  isFollowing: boolean;
}

function ProfilePageClient({
  isFollowing: initialIsFollowing,
  likedPosts,
  user,
  posts,
}: ProfilePageClientProps) {
  const { user: currentUser } = useUser();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);

  const [editForm, setEditFormData] = useState({
    name: user.name || "",
    location: user.location || "",
    website: user.website || "",
    bio: user.bio || "",
  });

  const handleEditSubmit = async () => {
    const formData = new FormData();
    Object.entries(editForm).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await updateProfile(formData);

    if (result.success) {
      setShowEditDialog(false);
      toast.success("Profile updated successfully");
    }
  };

  const handleFollow = async () => {
    if (!currentUser) return;

    try {
      setIsUpdatingFollow(true);
      await toggleFollow(user.id);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("Failed to update follow status");
    }
  };

  return <div>ProfilePageClient</div>;
}

export default ProfilePageClient;
