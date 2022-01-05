import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { OptimizeProducer } from './optimize.producer';
import { StrengthenProducer } from './strengthen.producer';

@Controller('optimize')
export class OptimizeController {
  constructor(
    private readonly optimizeProducer: OptimizeProducer,
    private readonly strengthenProducer: StrengthenProducer
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
  async processStrengthenCase(@UploadedFiles() file: Express.Multer.File) {
    return this.strengthenProducer.strengthenNew(file);
  }
}
