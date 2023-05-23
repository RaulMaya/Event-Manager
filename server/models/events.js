const { Schema, model } = require('mongoose');


const commentSchema = new Schema (
    {
    eventName: {
        type: String,
        required: true,
        maxLength: 50,
        minLength: 1

    },
    eventDescription: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    mainImg: {
        type: String,


    },
    portraitImg: {
        type: String,


    },
    tags: {


    },
    usersAssisting: {
        type: String,

    },
    
    eventStartDate: {
        type: Date,
        required: true,
    },
    eventLocation: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
        
    },
    eventType: {
        type: String,
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    
    
    eventCapacity: {
        type: String,
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    eventInvitation: {


    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },

},
{
    toJSON: {
      getters: true,
    },
    id: false,
  },

)



const Events = model('Events', commentSchema);
module.exports = Events;