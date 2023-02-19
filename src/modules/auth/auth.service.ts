import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { RedisService } from '../redis/redis.service';
import { LoginDto } from './interfaces/login.dto';
import { PremiumAccess } from './interfaces/premium-access.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async login({ username }: LoginDto) {
    const key = randomUUID();
    const paidMethods = [];

    const addMethods = {
      b: () => paidMethods.push(PremiumAccess.FIBONACCI),
      c: () => paidMethods.push(PremiumAccess.IS_PRIME),
      d: () => paidMethods.push(PremiumAccess.FACTORIAL),
      admin: () =>
        paidMethods.push(
          PremiumAccess.FACTORIAL,
          PremiumAccess.FIBONACCI,
          PremiumAccess.IS_PRIME,
        ),
    };

    addMethods[username]?.();

    const [token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: username,
          paidMethods,
          key,
        },
        {
          expiresIn: this.configService.get<string>('jwtExpiration'),
        },
      ),
      this.redisService.client.set(username, JSON.stringify({ key }), {
        EX: this.configService.get<number>('redisJwtExpiration'),
      }),
    ]);
    return { token };
  }

  async logout(username: string) {
    console.log(username);
    const userToken = await this.redisService.client.get(username);

    if (!userToken) return;

    await this.redisService.client.del(username);
  }
}
