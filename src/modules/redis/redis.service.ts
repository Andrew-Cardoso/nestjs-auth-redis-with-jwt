import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly redisUrl = this.configService.get<string>('redisUrl');
  private _redisClient: RedisClientType;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const redisClient = createClient({ url: this.redisUrl });
    await redisClient.connect();
    redisClient.on('error', (...errors) => this.handleRedisError(...errors));
    this._redisClient = <RedisClientType>redisClient;
  }

  get client(): RedisClientType {
    return this._redisClient;
  }

  private handleRedisError(...errors: any[]) {
    console.log(errors);
  }
}
