export const redisHost = process.env.REDIS_HOST;
export const redisPort = process.env.REDIS_PORT;
export const pgUser = process.env.PGUSER;
export const pgHost = process.env.PGHOST;
export const pgDatabase = process.env.PGDATABASE;
export const pgPassword = process.env.PGPASSWORD;
export const pgPort = process.env.PGPORT;

if (!redisHost || !redisPort) {
    console.log('No REDIS env variables');
    process.exit(1);
}

if (!pgUser || !pgHost || !pgDatabase || !pgPassword || !pgPassword) {
    console.log('No POSTGRESQL env variables');
    process.exit(1);
}
