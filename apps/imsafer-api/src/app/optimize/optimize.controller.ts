import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Queue } from 'bull';
import { Readable } from 'stream';

import { OptimizeProducer } from './optimize.producer';
import { StrengthenProducer } from './strengthen.producer';
import { OptimizeService } from './optimize.service';

@Controller('optimize')
export class OptimizeController {
  constructor(
    @InjectQueue('imsafer-strengthen') private readonly queue: Queue,
    private readonly optimizeProducer: OptimizeProducer,
    private readonly strengthenProducer: StrengthenProducer,
    private readonly optimizeService: OptimizeService
  ) {}

  // @Post('strengthen')
  // @UseInterceptors(AnyFilesInterceptor())
  // async processImage(@UploadedFiles() files: Express.Multer.File[]) {
  //   const job = await this.optimizeQueue.add('optimize', {
  //     files,
  //   });

  //   return {
  //     jobId: job.id,
  //   };
  // }
  @Post('strengthen0')
  @UseInterceptors(AnyFilesInterceptor())
  async processStrengthen0Case(@UploadedFiles() files: Express.Multer.File[]) {
    return this.optimizeProducer.strengthenCase(files);
  }

  @Post('strengthen')
  @UseInterceptors(AnyFilesInterceptor())
  async processStrengthenCase(
    @UploadedFiles() file: Express.Multer.File,
    @Body() body: { name: string }
  ) {
    console.log(body);
    return this.strengthenProducer.strengthenNew(file, body.name);
  }

  @Get('strengthen')
  async getAllStrengthenResults() {
    return this.optimizeService.findAllStrengthen();
  }

  @Get('strengthen/:id')
  async getStrengthenResults(
    @Res() response: Response,
    @Param('id') id: string
  ) {
    const job = await this.queue.getJob(id);

    if (!job) {
      return response.sendStatus(404);
    }

    const isCompleted = await job.isCompleted();

    if (!isCompleted) {
      return response.sendStatus(202);
    }

    const result = Buffer.from(job.returnvalue);

    const stream = Readable.from(result);

    stream.pipe(response);
  }
}
