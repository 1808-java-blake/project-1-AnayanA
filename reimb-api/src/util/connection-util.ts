import { Pool, Client} from 'pg';

export const connectionPool = new Pool ({
    user: process.env.REIMB_USERNAME,
    host: 'revature-1808.c8e8asbhoaa9.us-east-2.rds.amazonaws.com',
    database: 'postgres',
    password: process.env.REIMB_PASSWORD,
    port: 5432,
    max: 2
})