import { Redis } from './db';
import { fib } from './util';

const redis = Redis.DefaultSetup();

redis.subscriber.on('message', (channel: string, message: string) => {
    const index: number = parseInt(message);

    redis.client.hset('values', message, '' + fib(index));
});

redis.subscriber.subscribe('insert');
