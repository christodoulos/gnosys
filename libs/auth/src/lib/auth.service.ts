import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { getClientIp } from 'request-ip';
import { Request } from 'express';
import Cryptr = require('cryptr');

import { User } from '@gnosys/schemas';
import { RefreshToken } from '@gnosys/interfaces';

interface JwtPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  cryptr: Cryptr;
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('RefreshToken')
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService
  ) {
    this.cryptr = new Cryptr(
      process.env.ENCRYPT_JWT_SECRET || 'superdupersecret'
    );
  }

  async createAccessToken(userId: string) {
    const accessToken = sign(
      { userId },
      process.env.JWT_SECRET || 'superdupersecret',
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );
    // return this.encryptText(accessToken);
    return accessToken;
  }

  async createRefreshToken(req: Request, userId: string) {
    const refreshToken = new this.refreshTokenModel({
      userId,
      refreshToken: v4(),
      ip: this.getIp(req),
      browser: this.getBrowserInfo(req),
      country: this.getCountry(req),
    });
    await refreshToken.save();
    return refreshToken.refreshToken;
  }

  async validateUser(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.userModel.findOne({
      _id: jwtPayload.userId,
      emailVerified: true,
    });
    if (!user) {
      throw new UnauthorizedException('User not authorized.');
    }
    return user;
  }

  // JWT Extractor

  private jwtExtractor(request: Request) {
    let token = null;
    if (request.header('x-token')) {
      token = request.get('x-token');
    } else if (request.headers.authorization) {
      token = request.headers.authorization
        .replace('Bearer ', '')
        .replace(' ', '');
    } else if (request.body.token) {
      token = request.body.token.replace(' ', '');
    }
    if (request.query.token) {
      token = request.body.token.replace(' ', '');
    }
    const cryptr = new Cryptr(
      process.env.ENCRYPT_JWT_SECRET || 'superdupersecret'
    );
    if (token) {
      try {
        token = cryptr.decrypt(token);
      } catch (err) {
        throw new BadRequestException('Bad request.');
      }
    }
    return token;
  }

  // Helpers

  returnJwtExtractor() {
    return this.jwtExtractor;
  }

  getIp(req: Request): string | null {
    return getClientIp(req);
  }

  getBrowserInfo(req: Request): string {
    return req.headers['user-agent'] || 'XX';
  }

  getCountry(req: Request): string | string[] {
    return req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'XX';
  }

  encryptText(text: string): string {
    return this.cryptr.encrypt(text);
  }
}
