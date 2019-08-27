import redis, { RedisClient } from 'redis';

import { redisHost, redisPort } from '../util';

export interface IRedis {
    client: RedisClient;
    subscriber: RedisClient;
}

export class Redis implements IRedis {
    constructor(public client: RedisClient, public subscriber: RedisClient) {}

    static DefaultSetup(): Redis {
        const main = redis.createClient({
            host: redisHost,
            port: parseInt(redisPort),
            retry_strategy: () => 1000 // 1 second
        });

        const sub = main.duplicate();

        return new Redis(main, sub);
    }
}
