import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Strengthen, StrengthenDocument } from '@gnosys/schemas';
import { StrengthenCaseDto } from '@gnosys/dto';

@Injectable()
export class StrengthenProducer {
  constructor(
    @InjectModel(Strengthen.name) private model: Model<StrengthenDocument>,
    @InjectQueue('imsafer-strengthen') private readonly queue: Queue
  ) {}

  async strengthenNew(scase: Express.Multer.File, name: string) {
    const job = await this.queue.add('imsafer-strengthen-job', { scase });
    const createdJob = new this.model({ name, jobID: job.id });
    return await createdJob.save();
    // return { jobId: job.id };
  }
}
