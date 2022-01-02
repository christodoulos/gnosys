import { Test } from '@nestjs/testing';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

describe('UploadController', () => {
  let controller: UploadController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UploadService],
      controllers: [UploadController],
    }).compile();

    controller = module.get(UploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
