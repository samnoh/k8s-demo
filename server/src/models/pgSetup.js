import { Pool } from 'pg';

import { pgUser, pgHost, pgDatabase, pgPassword, pgPort } from '../util/keys';

export const client = new Pool({
    user: pgUser,
    host: pgHost,
    database: pgDatabase,
    password: pgPassword,
    port: pgPort
});

client.on('error', err => {
    console.error('Unexpected error on client', err);
    process.exit(1);
});

client.query('CREATE TABLE IF NOT EXISTS values (number INT)').catch(err => {
    console.error('Unexpected error on client', err);
    process.exit(1);
});
