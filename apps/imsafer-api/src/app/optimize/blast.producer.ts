import { BlastJob } from '@gnosys/interfaces';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { OptimizeService } from './optimize.service';
@Injectable()
export class StrengthenProducer {
  constructor(
    @InjectQueue('blast') private readonly queue: Queue,
    private service: OptimizeService
  ) {}

  async blastNew(bcase: BlastJob, name: string, uuid: string) {
    const job = await this.queue.add('blast-job', { bcase, name, uuid });
    return { jobID: job.id };
  }
}
