import Promise from 'bluebird';
import redis from 'redis';

import { redisHost, redisPort } from '../util/keys';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

export const client = redis.createClient({
    host: redisHost,
    port: parseInt(redisPort),
    retry_strategy: () => 1000 // 1 second
});

export const publisher = client.duplicate();
