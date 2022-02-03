import { FireJob } from '@gnosys/interfaces';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FireProducer {
  constructor(@InjectQueue('fire') private readonly queue: Queue) {}

  async fireNew(name: string, atc: string, uuid: string) {
    const job = await this.queue.add('fire-job', { name, fireData: atc, uuid });
    return { jobID: job.id, name, uuid };
  }
}
