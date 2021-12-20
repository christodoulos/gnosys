import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, RefreshTokenSchema } from '@gnosys/schemas';
import { User } from '@gnosys/api-interfaces';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.pre<User>('save', async function (next) {
            try {
              if (!this.isModified('password')) {
                return next();
              }
              const hashed = await bcrypt.hash(this.password, 10);
              this.password = hashed;
              return next();
            } catch (err) {
              return next(err);
            }
          });
        },
      },
      {
        name: 'RefreshToken',
        useFactory: () => {
          const schema = RefreshTokenSchema;
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
