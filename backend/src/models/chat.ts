import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Chat = new Schema({
    userA: {
        type: String
    },
    userB: {
        type: String
    },
    messages: {
        type: Array
    }
})

export default mongoose.model('Chat', Chat, 'chats');