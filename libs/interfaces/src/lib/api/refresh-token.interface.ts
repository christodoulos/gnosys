import { User } from './user.interface';
import { Document } from 'mongoose';

export interface RefreshToken extends Document {
  userId: User;
  refreshToken: string;
  ip: string;
  browser: string;
  country: string;
}
