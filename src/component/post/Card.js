import React, { useState, useRef } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import './Card.css';

const Card = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');
  const inputRef = useRef(null); // Create reference for the input

  const handleLike = () => setLikes(prev => prev + 1);

  const handleAddComment = () => {
    if (commentText.trim() === '') return;
    setComments(prev => [...prev, commentText]);
    setCommentText('');
  };

  // Focus the comment input when icon is clicked
  const handleCommentClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="card">
      {/* Header: User + Exact Time */}
      <div className="card-header d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/007/296/447/small_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg"
            alt="User"
            className="user-avatar"
          />
          <strong>{post.userid["name"]}</strong>
        </div>
        <div className="card-body">
          <p className="card-text">{post.content}</p>
          {post.uploadtype === "video" ? (
            <iframe width="100%" height="315" src={post.upload} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          ) : post.uploadtype === "image" ? (
            <img src={post.upload} className="post-media" alt="Uploaded content" />
          ) : null}
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-danger mx-2" onClick={() => onDelete(post._id)}>
            <i className="fa-solid fa-trash"></i> Delete
          </button>
          <button className="btn btn-primary" onClick={() => onUpdate(post._id)}>
            <i className="fa-solid fa-pen"></i> Edit
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="card-body">
        {post.uploadtype === "video" && (
          <iframe
            width="100%"
            height="300"
            src={post.upload}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title="video"
          ></iframe>
        )}
        {post.uploadtype === "image" && (
          <img src={post.upload} className="post-media" alt="Uploaded content" />
        )}
        <p className="card-text">{post.content}</p>

        {/* Like & Comment Buttons */}
        <div className="post-actions my-2 d-flex gap-3">
          <button
            className="btn btn-light d-flex align-items-center gap-1"
            onClick={handleLike}
            style={{ color: 'black' }}
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

        {/* Comment Input */}
        <div className="d-flex gap-2 mb-2">
          <input
            ref={inputRef} // Attach the ref
            type="text"
            className="form-control"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddComment}>
            Send
          </button>
        </div>

        {/* Display Comments */}
        <div className="comments-list">
          {comments.map((c, i) => (
            <div key={i} className="border-top pt-1">
              {c}
            </div>
          ))}
        </div>

        {/* Post Time */}
        <span className="post-time" style={{ fontSize: '0.9rem', color: 'gray' }}>
          {new Date(post.time).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Card;
