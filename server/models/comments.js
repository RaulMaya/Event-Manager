const { Schema, model } = require('mongoose');
const commentSchema = require('./events');

const commentSchema = new Schema (
    {
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },

    username: {
        type: String,
        required: true,
    },
},
{
    toJSON: {
      getters: true,
    },
    id: false,
  },

)



const Comment = model('Comment', commentSchema);
module.exports = Comment;