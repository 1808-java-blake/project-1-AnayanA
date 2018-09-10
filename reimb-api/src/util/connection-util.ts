import { Pool, Client} from 'pg';

export const connectionPool = new Pool ({
    user: process.env.REIMB_USERNAME,
    host: 'localhost',
    database: 'postgres',
    password: 'pass',
    port: 5432,
    max: 2
 })