import { User } from "../model/user";
import { SqlUser } from '../dto/sql-user';

/**
 * Used to convert sql user into a usable form
 */
export function userConverter(user: SqlUser) {
    return new User(user.user_id, user.username, undefined, user.first_name, user.last_name,
        user.email, user.role);
}