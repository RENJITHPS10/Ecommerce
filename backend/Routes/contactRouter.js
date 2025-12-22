const express = require("express");
const { createMessage, getAllContacts } = require("../Controllers/contactController");
const contactRouter = express.Router();


contactRouter.post("/create",createMessage);

contactRouter.get("/allcontact",getAllContacts)


module.exports= contactRouter;