import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { OptimizeService } from './optimize.service';

@Injectable()
export class StrengthenProducer {
  constructor(
    @InjectQueue('imsafer-strengthen') private readonly queue: Queue,
    private service: OptimizeService
  ) {}

  async strengthenNew(scase: Express.Multer.File, name: string) {
    const job = await this.queue.add('imsafer-strengthen-job', { scase });
    const timestamp = new Date(job.timestamp);
    await this.service.saveStrengthenJob(name, job.id.toString(), timestamp);
    return { jobID: job.id };
  }
}
