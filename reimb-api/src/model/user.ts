export class User {
    id = 0;
    username = '';
    password = '';
    firstName = '';
    lastName = '';
    email = '';
    role = 'employee';

    constructor(id?: number, username?: string, password?: string, 
        firstName?: string, lastName?: string, email?: string, role?: string) {
            id && (this.id = id);
            username && (this.username = username);
            password && (this.password = password);
            firstName && (this.firstName = firstName);
            lastName && (this.lastName = lastName);
            email && (this.email = email);
            role && (this.role = role);
    }
}