import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BullModule } from '@nestjs/bull';

import { AuthModule } from '@gnosys/auth';
import { UserModule } from '@gnosys/user';
import { MailModule } from '@gnosys/mail';
import { UploadModule } from '@gnosys/upload';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OptimizeModule } from './optimize/optimize.module';
import { OptimizeConsumer } from './optimize/optimize.consumer';
import { StrengthenConsumer } from './optimize/strengthen.consumer';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    UserModule,
    MailModule,
    UploadModule,
    OptimizeModule,
  ],
  controllers: [AppController],
  providers: [AppService, OptimizeConsumer, StrengthenConsumer],
})
export class AppModule {}
