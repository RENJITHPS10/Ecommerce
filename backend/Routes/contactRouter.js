
import express from "express";
import { createMessage, getAllContacts } from "../Controllers/contactController.js";
const contactRouter = express.Router();

contactRouter.post("/create", createMessage);
contactRouter.get("/allcontact", getAllContacts);

export default contactRouter;
