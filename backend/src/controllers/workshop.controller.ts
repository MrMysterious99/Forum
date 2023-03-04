import * as express from 'express';
import Radionica from "../models/workshop"

export class WorkshopController{

    getAll = (req: express.Request, res: express.Response) => {
        Radionica.find({}, (error, workshop) =>{
            if(error) console.log(error)
            else res.json(workshop)
        })
    }

    like = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
 

        Radionica.findOne({'_id': id, 'likes':{$elemMatch:{'username':req.body.username}}}, (error, rad)=>{
            if(error) console.log(error)
            else{
                if(rad){
                    return
                }
                let lajk = {
                    username: req.body.username
                }
                Radionica.findOneAndUpdate({ '_id': id }, { $push: {'likes': lajk} }, (err, success) => {
                    if (err) console.log(err);
                    else res.json({ msg: "Success" })
                })
            }
        })


    }

    search = (req: express.Request, res: express.Response) => {
        let param = req.query.param;
        console.log("param je: " + param)
        Radionica.find({'name':{$regex: param}}, (err, workshops)=>{
            if(err) console.log(err)
            else{
                console.log([workshops])
                res.json([workshops])
            } 
        })
    }


    signUp = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let prijava = {
            username: req.body.username,
            approved: false
        }
        Radionica.findOneAndUpdate({ '_id': id }, { $push: {'participants': prijava} }, (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }

    approve = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        let prijava = {
            username: req.body.username,
            approved: "pending"
        }
        Radionica.findOneAndUpdate({ '_id': id }, { $pull: {'participants': prijava} }, (err, success) => {
            if (err) console.log(err);
            else{
                let prijava = {
                    username: req.body.username,
                    approved: "approved"
                }
                Radionica.findOneAndUpdate({ '_id': id }, { $push: {'participants': prijava} }, (err, success) => {
                    if (err) console.log(err);
                    else res.json({ msg: "Success" })
                })
            } 
        })
    }

    reject = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        let prijava = {
            username: req.body.username,
            approved: "pending"
        }
        Radionica.findOneAndUpdate({ '_id': id }, { $pull: {'participants': prijava} }, (err, success) => {
            if (err) console.log(err);
            else{
                let prijava = {
                    username: req.body.username,
                    approved: "rejected"
                }
                Radionica.findOneAndUpdate({ '_id': id }, { $push: {'participants': prijava} }, (err, success) => {
                    if (err) console.log(err);
                    else res.json({ msg: "Success" })
                })
            } 
        })
    }

    saveEdit = (req: express.Request, res: express.Response) => {
        // let workshop = new Radionica(req.body)
        let workshop = {
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            basicinfo: req.body.basicinfo,
            longinfo: req.body.longinfo,
            creator: req.body.creator,
            comments: req.body.comments,
            likes: req.body.likes,
            capacity: req.body.capacity,
            participants: req.body.participants,
            photo:req.body.photo,
            approved:req.body.approved,
            gallery:req.body.gallery
          }

        // console.log(workshop)
        console.log(workshop.approved)
        
        Radionica.replaceOne({ '_id': req.body.id}, workshop, (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }

    proposeWorkshop = (req: express.Request, res: express.Response) => {
        let workshop = new Radionica({
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            basicinfo: req.body.basicinfo,
            longinfo: req.body.longinfo,
            creator: req.body.creator,
            comments: [],
            likes: [],
            capacity: req.body.capacity,
            participants: [],
            photo:req.body.photo,
            gallery:req.body.gallery,
            approved: req.body.approved
        })


        workshop.save().then(user=>{
            res.status(200).json({'msg': 'workshop added'});
        }).catch(err=>{
            res.status(400).json({'msg': 'error'})
        })
    }

    approveWorkshop = (req: express.Request, res: express.Response) => {
        Radionica.updateOne({ '_id': req.body.id}, { $set: { approved: "approved" }}, (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }

    deleteWorkshop = (req: express.Request, res: express.Response) => {
        Radionica.deleteOne({ '_id': req.body.id}, (err, success) => {
            if (err) console.log(err);
            else res.json({ msg: "Success" })
        })
    }

}
