import { Module } from '@nestjs/common';
import { FirebaseModule } from 'nestjs-firebase';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import serviceAccount = require('./serviceAccountKey.json');

import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'ntuadt'),
      exclude: ['/api*'],
    }),
    FirebaseModule.forRoot({
      googleApplicationCredential: {
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}