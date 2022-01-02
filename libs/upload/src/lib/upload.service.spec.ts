import { Test } from '@nestjs/testing';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UploadService],
    }).compile();

    service = module.get(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
