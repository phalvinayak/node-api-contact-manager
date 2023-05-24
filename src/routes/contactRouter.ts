import { Router } from "express";
import {
  getContact,
  createContact,
  deleteContact,
  getAllContact,
  updateContact,
} from "@src/controllers/contactController";
import validateToken from "@src/middleware/validateToken";

const contactRouter = Router();

contactRouter.use(validateToken);

contactRouter.route("/").get(getAllContact).post(createContact);

contactRouter
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default contactRouter;
