import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Strengthen, StrengthenDocument } from '@gnosys/schemas';
import { StrengthenCaseDto } from '@gnosys/dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OptimizeService {
  constructor(
    @InjectModel(Strengthen.name) private model: Model<StrengthenDocument>
  ) {}

  async findAllStrengthen(): Promise<Strengthen[]> {
    return this.model.find().exec();
  }
}
