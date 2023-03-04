import express from 'express';
import { WorkshopController } from '../controllers/workshop.controller'


const workshopRouter = express.Router();

workshopRouter.route("/getAll").get(
    (req, res) => new WorkshopController().getAll(req, res)
)

workshopRouter.route("/like").post(
    (req, res) => new WorkshopController().like(req, res)
)

workshopRouter.route("/search").get(
    (req, res) => new WorkshopController().search(req, res)
)

workshopRouter.route("/signUp").post(
    (req, res) => new WorkshopController().signUp(req, res)
)

workshopRouter.route("/approve").post(
    (req, res) => new WorkshopController().approve(req, res)
)

workshopRouter.route("/reject").post(
    (req, res) => new WorkshopController().reject(req, res)
)

workshopRouter.route("/saveEdit").post(
    (req, res) => new WorkshopController().saveEdit(req, res)
)

workshopRouter.route("/proposeWorkshop").post(
    (req, res) => new WorkshopController().proposeWorkshop(req, res)
)

workshopRouter.route("/approveWorkshop").post(
    (req, res) => new WorkshopController().approveWorkshop(req, res)
)

workshopRouter.route("/deleteWorkshop").post(
    (req, res) => new WorkshopController().deleteWorkshop(req, res)
)


export default workshopRouter;