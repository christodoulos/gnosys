import { InjectQueue } from '@nestjs/bull';
import {
  Body,
  Controller,
  Get,
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

import { OptimizeProducer } from './optimize.producer';
import { StrengthenProducer } from './strengthen.producer';
import { OptimizeService } from './optimize.service';
import { nanoid } from 'nanoid';

@Controller('optimize')
export class OptimizeController {
  constructor(
    @InjectQueue('strengthen') private readonly queue: Queue,
    private readonly optimizeProducer: OptimizeProducer,
    private readonly strengthenProducer: StrengthenProducer,
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
    console.log(body);
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
}
