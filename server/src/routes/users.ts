import { Response, Request, Router } from 'express';
import { Auth } from '../middleware/auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserStore } from '../models/users';

export const Users: Router = Router();
const store = new UserStore();

Users.post('/', Auth, async (req: Request, res: Response) => {

    const { firstname, lastname, password } = req.body;
    console.log(req.body);
    try {
        const products = await store.create(firstname,lastname,password);
        res.json(products);
      } catch(err) {
        res.status(400)
        res.json(err)
    }
})

Users.get('/generatetoken', async (req: Request, res: Response) => {
    try {
        const payload = {
            user: '1'
        };
        jwt.sign(
            payload,
            `${process.env.JWTSECRET}`,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).send('Server error');
    }

})

Users.get('/all', Auth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const products = await store.all();
        res.json(products);
      } catch(err) {
        res.status(400)
        res.json(err)
    }
})

Users.get('/:id', Auth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const products = await store.getProductById(id);
        res.json(products);
      } catch(err) {
        res.status(400)
        res.json(err)
    }
})

