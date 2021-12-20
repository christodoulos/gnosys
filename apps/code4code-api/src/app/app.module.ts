import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from '@gnosys/auth';
import { UserModule } from '@gnosys/user';
import { MailModule } from '@gnosys/mail';

import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'gnosys'),
      exclude: ['/api*'],
    }),
    AuthModule,
    UserModule,
    MailModule,
  ],
})
export class AppModule {}
