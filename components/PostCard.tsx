"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { getPosts } from "@/actions/post.action";
import { toggleLike, createComment, deletePost } from "@/actions/post.action";
import { toast } from "react-hot-toast";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

function PostCard({ post, dbUserId }: { post: Post; dbUserId: null }) {
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === dbUserId),
  );
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      setHasLiked(!hasLiked);
      setOptimisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(post.id);
    } catch (error) {
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === dbUserId));
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (isCommenting || !newComment.trim()) return;

    try {
      setIsCommenting(true);
      const result = await createComment(post.id, newComment.trim());

      if (result?.success) {
        toast.success("Comment added successfully!");
        setNewComment("");
      }
    } catch (error) {
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      if (isDeleting) return;

      setIsDeleting(true);
      const result = await deletePost(post.id);

      if (result?.success) {
        toast.success("Post deleted successfully!");
      } else {
        toast.error("Failed to delete post. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return <div>PostCard</div>;
}

export default PostCard;
