import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class StrengthenProducer {
  constructor(
    @InjectQueue('imsafer-strengthen') private readonly queue: Queue
  ) {}

  async strengthenNew(scase: Express.Multer.File) {
    const job = await this.queue.add('imsafer-strengthen-job', { scase });

    return { jobId: job.id };
  }
}
