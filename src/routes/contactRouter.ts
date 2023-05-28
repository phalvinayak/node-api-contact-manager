import { Router } from "express";
import {
  getContact,
  createContact,
  deleteContact,
  getAllContact,
  updateContact,
} from "@controllers/contactController";
import validateToken from "@middleware/validateToken";

const contactRouter = Router();

contactRouter.use(validateToken);

contactRouter.route("/").get(getAllContact).post(createContact);

contactRouter
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default contactRouter;
