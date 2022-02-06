import { BlastJob } from '@gnosys/interfaces';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class BlastProducer {
  constructor(@InjectQueue('blast') private readonly queue: Queue) {}

  async blastNew(name: string, data: BlastJob, uuid: string) {
    const job = await this.queue.add(
      'blast-job',
      {
        name,
        blastData: data,
        uuid,
      },
      { attempts: 5, backoff: 5000 }
    );
    return { jobID: job.id, name, uuid };
  }
}
