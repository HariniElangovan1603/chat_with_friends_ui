import React from 'react';
import './Card.css';

const Card = ({ post, onDelete, onUpdate }) => {
    return (
        <div className="card">
            <div className="card-header">
                <img src="https://via.placeholder.com/40" alt="User" />
                <strong>{post.userid.name}</strong>
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
    );
};

export default Card;