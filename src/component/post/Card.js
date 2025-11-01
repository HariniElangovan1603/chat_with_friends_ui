import React, { useState, useRef, useEffect } from 'react';
import { FaHeart, FaComment, FaEllipsisV } from 'react-icons/fa';
import './Card.css';
import axios from 'axios';
import apiUrl from "../../apiConfig";

const Card = ({ post, onDelete }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(post.isLiked || false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  // Fetch likes from backend
  useEffect(() => {
    async function fetchLikes() {
      try {
        const res = await axios.get(`${apiUrl}/like/${post._id}`);

        // Expect backend: { totalLikes, users }
        setLikes(res.data.totalLikes);

        const user = JSON.parse(localStorage.getItem("user"));
        if (user && res.data.users.includes(user._id)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    }

    fetchLikes();
  }, [post._id]);

  // Toggle like/unlike
  async function handleLike() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.post(`${apiUrl}/like/${post._id}`, { user }, likes);

      // update button color based on backend response
      setLiked(res.data.status === "liked");
      console.log(res.data)
      // refresh like count
      const countRes = await axios.get(`${apiUrl}/like/${post._id}`);
      setLikes(countRes.data.totalLikes);
    } catch (err) {
      console.error("Error toggling like:", err.response?.data || err.message);
    }
  }

  // Add comment locally
  const handleAddComment = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (commentText.trim() === '') return;
    if (commentText.trim() === '') return;
    setComments(prev => [...prev, { user: user.name, text: commentText }]);
    console.log(`💬 ${user.name} commented: ${commentText}`)
    setCommentText('');
  };

  const handleCommentClick = () => {
    inputRef.current?.focus();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete?.(post._id); // Call parent delete function
    }
    setMenuOpen(false);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/007/296/447/small_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg"
            alt="User"
            className="user-avatar"
          />
          <strong>{post.user.name || post.user}</strong>
        </div>

        {/* Menu */}
        <div className="position-relative">
          <FaEllipsisV
            style={{ cursor: 'pointer' }}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {/* {menuOpen && (
            <div className="menu-dropdown">
              <button className="dropdown-item" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )} */}
        </div>
      </div>

      {/* Content */}
      <div className="card-body">
        {post.uploadtype === "video" && (
          <iframe
            width="100%"
            height="380px"
            src={`https://play.google.com/${post.upload}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title="video"
          ></iframe>
        )}
        {post.uploadtype === "image" && (
          <img
            src={post.upload}
            className="post-media mb-3"
            alt="Uploaded content"
            width="100%"
            height="150px"
          />
        )}
        <p className="card-text">{post.content}</p>

        {/* Actions */}
        <div className="post-actions my-2 d-flex gap-3">
          <button
            className="btn btn-light d-flex align-items-center gap-1"
            onClick={handleLike}
            style={{ color: liked ? "red" : "black" }}
          >
            <FaHeart /> {likes}
          </button>
          <button
            className="btn btn-light d-flex align-items-center gap-1"
            onClick={handleCommentClick}
            style={{ color: 'black', marginLeft: '40px' }}
          >
            <FaComment /> {comments.length}
          </button>
        </div>

        {/* Comment input */}
        <div className="d-flex gap-2 mb-2">
          <textarea
            ref={inputRef}
            className="form-control"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            style={{
              overflowY: "auto",
              maxHeight: "30px",
              resize: "none"
            }}
          ></textarea>

          <button className="btn btn-primary" onClick={handleAddComment}>
            Send
          </button>
        </div>


        {/* Comments list */}
        <div
          className="comments-list"
          style={{
            maxHeight: "200px",  // adjust height as needed
            overflowY: "auto",   // enables vertical scrollbar
            paddingRight: "8px"  // prevent scrollbar overlap
          }}
        >
          {comments.map((c, index) => (
            <div key={index} className="border-top pt-1 pb-1">
              <strong>{c.user}</strong><br />
              {c.text}
            </div>
          ))}
        </div>


        {/* Post time */}
        <span className="post-time" style={{ fontSize: '0.9rem', color: 'gray' }}>
          {new Date(post.time).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Card;
