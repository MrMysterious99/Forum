import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    organization: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    postalcode: {
        type: String
    },
    street: {
        type: String
    },
    type: {
        type: String
    },
    photo: {
        type: String
    },
    status: {
        type: String
    },
    taxNumber: {
        type: String
    }
})

export default mongoose.model('Korisnik', Korisnik, 'users');