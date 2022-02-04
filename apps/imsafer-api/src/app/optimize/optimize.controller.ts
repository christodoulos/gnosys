import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Queue } from 'bull';
import { createReadStream } from 'fs';

import { OptimizeProducer } from './optimize.producer';
import { StrengthenProducer } from './strengthen.producer';
import { BlastProducer } from './blast.producer';
import { FireProducer } from './fire.producer';
import { OptimizeService } from './optimize.service';
import { nanoid } from 'nanoid';

@Controller('optimize')
export class OptimizeController {
  constructor(
    @InjectQueue('strengthen') private readonly queue: Queue,
    @InjectQueue('blast') private readonly blastQueue: Queue,
    @InjectQueue('fire') private readonly fireQueue: Queue,
    private readonly optimizeProducer: OptimizeProducer,
    private readonly strengthenProducer: StrengthenProducer,
    private readonly blastProducer: BlastProducer,
    private readonly fireProducer: FireProducer,
    private readonly optimizeService: OptimizeService
  ) {}

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
    console.log('STRENGTHEN CONTROLLER', body);
    const uuid = nanoid();
    return this.strengthenProducer.strengthenNew(file, body.name, uuid);
  }

  @Get('strengthen')
  async getAllStrengthenResults() {
    return this.optimizeService.findAllStrengthen();
  }

  @Get('strengthen/:id')
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ): Promise<StreamableFile> {
    const job = await this.queue.getJob(id);
    const name = await this.optimizeService.findNameByJobID(id);
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${name}.zip"`,
    });
    const result = Buffer.from(job.returnvalue);
    return new StreamableFile(result);
  }

  @Get('strengthen/:id/picture')
  @Header('Content-Type', 'image/jpg')
  @Header('Content-Disposition', 'attachment; filename=Data_r.jpg')
  async getStrengthenResultPicture(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ): Promise<StreamableFile> {
    const job = await this.queue.getJob(id);
    const { name, uuid } = job.data;
    const plot = `/tmp/imsafer/strengthen/${name}-${uuid}/Data_r.jpg`;
    const data = createReadStream(plot);
    return new StreamableFile(data);
  }

  @Get('strengthenJob/:id')
  async getStrengthenJob(@Res() res: Response, @Param('id') id: string) {
    const job = await this.queue.getJob(id);
    const jobIsCompleted = await job.isCompleted();
    const jobHasFailed = await job.isFailed();
    const progress = job.progress();
    let failedReason = '';
    if (jobHasFailed) failedReason = job.failedReason;
    console.log({
      completed: jobIsCompleted,
      failed: jobHasFailed,
      failedReason: failedReason,
      progress: progress,
    });
    res.send({
      completed: jobIsCompleted,
      failed: jobHasFailed,
      failedReason: failedReason,
      progress: progress,
    });
  }

  @Post('fire')
  @UseInterceptors(AnyFilesInterceptor())
  async processFireCase(@Body() body: { name: string; atc: string }) {
    const uuid = nanoid();
    return this.fireProducer.fireNew(body.name, body.atc, uuid);
  }

  @Get('fire')
  async getAllFireJobs() {
    return this.fireQueue.getJobs([
      'active',
      'completed',
      'delayed',
      'failed',
      'paused',
      'waiting',
    ]);
  }

  @Get('fire/:id')
  async fireResults(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ): Promise<StreamableFile> {
    const job = await this.fireQueue.getJob(id);
    const name = job.data['name'];
    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename="${name}.txt`,
    });
    const result = Buffer.from(job.returnvalue);
    return new StreamableFile(result);
    // return new StreamableFile(job.returnvalue);
  }

  @Post('blast')
  @UseInterceptors(AnyFilesInterceptor())
  async processBlastCase(@Body() body: { name: string; data: string }) {
    const uuid = nanoid();
    return this.blastProducer.blastNew(body.name, JSON.parse(body.data), uuid);
  }

  @Get('blastResults/:id')
  async blastResults(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ): Promise<StreamableFile> {
    const job = await this.blastQueue.getJob(id);
    const name = job.data['name'];
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${name}.zip"`,
    });
    const result = Buffer.from(job.returnvalue);
    return new StreamableFile(result);
  }

  @Get('blast/:id')
  async getBlastResults(@Res() res: Response, @Param('id') id: string) {
    const job = await this.blastQueue.getJob(id);
    const jobIsCompleted = await job.isCompleted();
    const jobHasFailed = await job.isFailed();
    let failedReason = '';
    if (jobHasFailed) failedReason = job.failedReason;
    res.send({
      completed: jobIsCompleted,
      failed: jobHasFailed,
      failedReason: failedReason,
    });
  }

  @Get('blast/:id/picture')
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'attachment; filename=plot.png')
  async getBlastResultPicture(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string
  ): Promise<StreamableFile> {
    const job = await this.blastQueue.getJob(id);
    const { name, uuid } = job.data;
    const plot = `/tmp/imsafer/blast/${name}-${uuid}/plot.png`;
    const data = createReadStream(plot);
    return new StreamableFile(data);
  }
}
