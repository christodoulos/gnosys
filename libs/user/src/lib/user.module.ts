import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  User,
  UserSchema,
  ForgotPassword,
  ForgotPasswordSchema,
} from '@gnosys/schemas';

import { AuthModule } from '@gnosys/auth';
import { MailModule } from '@gnosys/mail';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: ForgotPassword.name, schema: ForgotPasswordSchema },
    ]),
    AuthModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
