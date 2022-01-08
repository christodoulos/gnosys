import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import validator from 'validator';

export type StrengthenDocument = Strengthen & Document;

@Schema()
export class Strengthen {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: 0 })
  jobID!: number;
}

export const StrengthenSchema = SchemaFactory.createForClass(Strengthen);
