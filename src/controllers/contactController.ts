import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ContactModel from "@src/models/schema/contactModel";
import { AuthRequest } from "@src/models/types/types";

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getAllContact = asyncHandler(async (req: AuthRequest, res: Response) => {
  // @TODO need to find a way make sure, AuthRequest says user object will be available on req
  // Right now its a optional
  const contacts = await ContactModel.find({ user_id: req.user!.id });
  res.status(200).json(contacts);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contact = await ContactModel.find({
    _id: req.params.id,
    user_id: req.user!.id,
  });
  if (!contact?.length) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

// @desc Create contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, email, phone } = req.body;
  console.log("The request body is", req.body);
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await ContactModel.create({
    name,
    email,
    phone,
    user_id: req.user!.id,
  });
  res.status(201).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contact = await ContactModel.find({
    _id: req.params.id,
    user_id: req.user!.id,
  });
  if (!contact?.length) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  const updatedContact = await ContactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc Delete contact
// @route DELETE /api/contacts
// @access private
const deleteContact = asyncHandler(async (req: AuthRequest, res: Response) => {
  const contact = await ContactModel.find({
    _id: req.params.id,
    user_id: req.user!.id,
  });
  if (!contact.length) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  await ContactModel.findByIdAndRemove(req.params.id);
  res.status(200).json(contact);
});

export {
  getAllContact,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
