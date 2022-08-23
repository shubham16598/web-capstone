import { database } from '../../config/database';
import { Story } from '../types/Story';

export class StoryStore {
    async all(): Promise<Story[]> {
        let result;
        result = await database.query(`SELECT * FROM story`);
        return result.rows;
    }

    async getStoryById(id: Number): Promise<Story[]> {
        let result;
        result = await database.query(`SELECT * FROM story WHERE id = $1`, [id]);
        console.log(result);
        return result.rows;
    }

    async create(title: Text, summary: Text): Promise<Story[]> {
        let result;
        if (title === undefined || summary === undefined) {
            throw new Error(`Error Occurred`);
        } else {
            result = await database.query(`INSERT INTO story (title, summary) VALUES($1, $2) RETURNING *`,
                [title, summary]);
        }
        return result.rows;
    }
}