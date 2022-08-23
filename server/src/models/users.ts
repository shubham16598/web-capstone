import { database } from '../../config/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../types/User';

export class UserStore {
    async all(): Promise<User[]> {
        let result;
        result = await database.query(`SELECT * FROM users`);
        console.log(result);
        return result.rows;
    }

    async getUserById(id: Number): Promise<User[]> {
        let result;
        result = await database.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return result.rows;
    }

    async create(username: Text, password: Text): Promise<User[]> {
        let result;
        if (username === undefined || password === undefined) {
            throw new Error(`User not found`)
        } else {
            const newpassword = await bcrypt.hashSync(password, parseInt(`${process.env.SALTROUND}`));


            result = await database.query(`INSERT INTO users (username, password) VALUES($1, $2) RETURNING *`,
                [username, newpassword]);
        }

        return result.rows;
    }

    async login(username: Text, password: Text): Promise<string> {
        let result: string = '';
        if (username === undefined || password === undefined) {
            throw new Error(`User not found`)
        } else {
            const user = await database.query(`SELECT * FROM users WHERE username = $1`, [username]);
            console.log(user);
            const verified = await bcrypt.compareSync(password, user.rows[0].password);
            if (verified) {
                const payload = {
                    user: username,
                };
                await jwt.sign(
                    payload,
                    `${process.env.JWTSECRET}`,
                    { expiresIn: 360000 },
                    (err, token) => {
                        if (err) throw err;
                        result = token;
                    }
                );
            }

        }
        return result;
    }
}