import { database } from '../../config/database';
import bcrypt from 'bcrypt';
import { User } from '../types/User';

export class UserStore {
    async all(): Promise<User[]> {
        let result;
        result = await database.query(`SELECT * FROM users`);
        console.log(result);
        return result.rows;
    }

    async getProductById(id: Number): Promise<User[]> {
        let result;
        result = await database.query(`SELECT * FROM users WHERE id = $1`,[id]);
        return result.rows;
    }

    async create(firstname: Text, lastname: Text, password: Text): Promise<User[]> {
        let result;
        if (firstname === undefined || lastname === undefined || password === undefined) {
            throw new Error(`User not found`)
        } else {
            const newpassword = await bcrypt.hashSync(password, parseInt(`${process.env.SALTROUND}`));

            
            result = await database.query(`INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *`,
                [firstname, lastname, newpassword]);
        }

        return result.rows;
    }
}