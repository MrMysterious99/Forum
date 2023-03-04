import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Radionica = new Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: Date
    },
    basicinfo: {
        type: String
    },
    longinfo: {
        type: String
    },
    creator: {
        type: String
    },
    likes: {
        type: Array
    },
    comments: {
        type: Array
    },
    participants: {
        type: Array
    },
    capacity: {
        type: Number
    },
    photo: {
        type: String
    },
    gallery: {
        type: Array
    },
    approved: {
        type: String
    }
})

export default mongoose.model('Radionica', Radionica, 'workshops');