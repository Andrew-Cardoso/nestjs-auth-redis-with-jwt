import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisService } from '../../redis/redis.service';
import { CurrentUser } from '../interfaces/current-user';
import { PremiumAccess } from '../interfaces/premium-access.enum';

interface JwtPayload {
  key: string;
  sub: string;
  paidMethods: PremiumAccess[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtSecret'),
    });
  }

  async validate({ sub, paidMethods, key }: JwtPayload) {
    const currentUser: CurrentUser = {
      username: sub,
      paidMethods,
      key,
    };

    const token = await this.redisService.client.get(sub);

    if (!token) return;

    const { key: redisKey } = JSON.parse(token);

    return redisKey === key && currentUser;
  }
}
