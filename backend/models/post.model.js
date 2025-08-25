const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    uploadtype: { type: String, required: true },
    upload: { type: String, required: true },
    content: { type: String, required: true },
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;