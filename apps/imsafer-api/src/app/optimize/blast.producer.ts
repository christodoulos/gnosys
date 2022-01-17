import { BlastJob } from '@gnosys/interfaces';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { OptimizeService } from './optimize.service';
@Injectable()
export class BlastProducer {
  constructor(
    @InjectQueue('blast') private readonly queue: Queue,
    private service: OptimizeService
  ) {}

  async blastNew(name: string, data: BlastJob, uuid: string) {
    console.log(data);
    const job = await this.queue.add('blast-job', {
      name,
      blastData: data,
      uuid,
    });
    return { jobID: job.id, name, uuid };
  }
}
