import * as express from 'express';
import Korisnik from "../models/user"
import Chat from '../models/chat';

export class UserController{

    login = (req: express.Request, res: express.Response) =>{
        let username = req.body.username;
        let password = req.body.password;
        
        Korisnik.findOne({'username':username, 'password':password}, (error, user) => {   
            if(error){
                console.log(error);
            } 
            else {
                res.json(user)
            }
        })
    }

    changePass = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let newPass = req.body.newPassword;
        Korisnik.findOneAndUpdate({ 'username': username }, { $set: { password: newPass } }, (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })

    }

    register = (req: express.Request, res: express.Response) => {
        let user = new Korisnik(req.body)

        Korisnik.findOne( {$or:[{'username':req.body.username}, {'email':req.body.email}]}, (error, korisnik) => {   
            if(error){
                console.log(error);
            } 
            else {
                if(korisnik){
                    res.status(200).json({'message': 'That email or username is already used. Please try something else'})
                    return
                }else{
                    user.save().then(user=>{
                        res.status(200).json({'message': 'user added'});
                    }).catch(err=>{
                        res.status(400).json({'message': 'error'})
                    })
                }
                
            }
        })


    }

    openChat = (req: express.Request, res: express.Response) => {
        let a = req.body.userA
        let b = req.body.userB

        Chat.findOne( {$or:[{'userA':a, 'userB':b}, {'userA':b, 'userB':a}]} ,(error, chat) => {   
            if(error){
                console.log(error);
            } 
            else {
                if(chat!=null)
                    res.json({ msg: "postoji" })
                else{
                    let chat = new Chat({
                        userA : a,
                        userB : b,
                        messages : []
                    }) 

                    chat.save().then(user=>{
                        res.status(200).json({'msg': 'chat added'});
                    }).catch(err=>{
                        res.status(400).json({'msg': 'error'})
                    })

                }
                // res.json(user)
            }
        })
    }
                                       
    getAllChats = (req: express.Request, res: express.Response) => {
        console.log("get all chats")

        let a = req.body.username
        Chat.find( {$or:[{'userA':a}, {'userB':a}]}, (error, chats) =>{
            if(error) console.log(error)
            else res.json(chats)
        })
    }

    sendMessage = (req: express.Request, res: express.Response) => {
        let a = req.body.a
        let b = req.body.b
        let sender = req.body.sender
        let time = req.body.time
        let text = req.body.text

        Chat.findOne( {$or:[{'userA':a, 'userB':b}, {'userA':b, 'userB':a}]} , (error, chat)=>{
            if(error) console.log(error)
            else{
                if(chat){
                    let message = {
                        sender: sender,
                        text: text,
                        time: time
                    }

                    Chat.collection.updateOne({$or:[{'userA':a, 'userB':b}, {'userA':b, 'userB':a}]}, {$push: {'messages': message}});
                    res.json({'msg': 'ok'})
                }else{
                    res.json({'msg': 'error'})
                }
            }

        })
    }
    
    getAll  = (req: express.Request, res: express.Response) => {
        Korisnik.find({}, (error, users) =>{
            if(error) console.log(error)
            else res.json(users)
        })
    }

    saveEdit = (req: express.Request, res: express.Response) => {
        // let workshop = new Radionica(req.body)
        let user = {
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            organization: req.body.organization,
            country: req.body.country,
            city: req.body.city,
            postalcode: req.body.postalcode,
            street: req.body.street,
            type: req.body.type,
            status: req.body.status,
            taxNumber: req.body.taxNumber,
            photo: req.body.photo
          }

        // console.log(workshop)
        console.log(user.name)
        console.log(req.body.id)
        
        Korisnik.replaceOne({ '_id': req.body.id}, user, (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }


    deleteUser = (req: express.Request, res: express.Response) => {
        Korisnik.deleteOne({ '_id': req.body.id}, (error, users) =>{
            if(error) console.log(error)
            else res.json(users)
        })
    }



}
