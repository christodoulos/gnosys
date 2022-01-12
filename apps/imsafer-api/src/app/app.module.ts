import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from '@gnosys/auth';
import { UserModule } from '@gnosys/user';
import { MailModule } from '@gnosys/mail';
import { UploadModule } from '@gnosys/upload';
import { OptimizeModule } from './optimize/optimize.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { StrengthenConsumer } from './optimize/strengthen.consumer';
// import { OptimizeService } from './optimize/optimize.service';

import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'imsafer'),
      exclude: ['/api*'],
    }),

    MongooseModule.forRoot(process.env.MONGO_URI),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // AuthModule,
    // UserModule,
    // MailModule,
    UploadModule,
    OptimizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
