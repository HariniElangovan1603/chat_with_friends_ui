import { useState, useEffect } from "react";
import axios from "axios";

export default function Post({ post, currentUser }) {
  const [likes, setLikes] = useState(post.likes || []);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if current user has already liked
    setLiked(likes.some(like => like.user_id === currentUser.id));
  }, [likes, currentUser.id]);

  const toggleLike = async () => {
    try {
      if (!liked) {
        // Like post
        const res = await axios.post(`/posts/${post.id}/like`, { user_id: currentUser.id });
        setLikes(res.data.likes);
        setLiked(true);
      } else {
        // Unlike post
        const res = await axios.delete(`/posts/${post.id}/unlike`, { data: { user_id: currentUser.id } });
        setLikes(res.data.likes);
        setLiked(false);
      }
    } catch (err) {
      console.error("Like action failed:", err);
    }
  };

  return (
    <div className="card mt-3">
      <p>{post.content}</p>
      <button onClick={toggleLike}>
        {liked ? "💖 Liked" : "🤍 Like"} ({likes.length})
      </button>
    </div>
  );
}
