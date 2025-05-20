import User from '../models/user.model.ts';
import type { Request, Response, RequestHandler } from 'express';

export const createUser:RequestHandler  = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user)
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const getUsers:RequestHandler = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const skip = (page - 1) * limit;

  const users = await User.find({ isDeleted: false }).skip(skip).limit(limit);
  res.status(200).json(users);
}

export const getUser:RequestHandler = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) {
      res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
}

export const updateUser:RequestHandler = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) {
      res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
}

export const deleteUser:RequestHandler = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isDeleted: true },  { new: true });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }
  res.status(204).json({ message: 'Deleted successfully' });
}

export const getDeletedUsers:RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.body;
  const user = await User.updateMany({ _id: { $in: id } }, { isDeleted: true }, { new: true });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'Deleted successfully' });
}