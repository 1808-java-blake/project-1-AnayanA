import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { userConverter } from "../util/user-converter";

/**
 * Add a new user to the DB
 * @param user
 */
export async function create(user: User): Promise<number> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `INSERT INTO ers.users
            (username, password, first_name, 
             last_name, email, role)
             VALUES ($1, $2, $3, $4, $5, 'customer')
             RETURNING user_id`, 
             [user.username, user.password, user.firstName, user.lastName, user.email]);
        return resp.rows[0].user_id;
    } finally {
        client.release();
    }
}

/**
 * Retrieve a single user by username and password
 * @param id
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
 const client = await connectionPool.connect();
 try {
     const resp = await client.query(
         `SELECT * FROM ers.users u
            WHERE u.username = $1
            AND u.password = $2`, [username, password]);
    if(resp.rows.length !== 0) {
        return userConverter(resp.rows[0]);
    }
    return null;
 } finally {
     client.release();
 }
}

/**
 * Retrieves a single usre by id
 * @param id
 */
export async function findById(id: number): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ers.users u
             WHERE u.user_id = $1`, [id]);
        const user = userConverter(resp.rows[0]); // get user data

        return user;
    } finally {
        client.release();
    }
}