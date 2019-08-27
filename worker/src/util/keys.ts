export const redisHost = process.env.REDIS_HOST as string;
export const redisPort = process.env.REDIS_PORT as string;

if (!redisHost || !redisPort) {
    console.log('No REDIS env variables');
    process.exit(1);
}
