import { Response, Request, Router } from 'express';
import { Auth } from '../middleware/auth';
import { UserStore } from '../models/users';

export const Users: Router = Router();
const userStore = new UserStore();

Users.post('/', async (req: Request, res: Response) => {

    const { username, password } = req.body;
    try {
        const user = await userStore.create(username, password);
        res.json(user);
      } catch(err) {
        res.status(400)
        res.json(err)
    }
})

Users.get('/', async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        const users = await userStore.getUser(username);
        res.json(users);
      } catch(err) {
        res.status(400)
        res.json(err)
    }
})

Users.get('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await userStore.login(username, password);
        res.json(token);
    } catch (err) {
        res.status(500).send('Server error');
    }

})

Users.get('/all', Auth, (req: Request, res: Response) => {
    try {
        const users = userStore.all();
        res.json(users);
      } catch(err) {
        res.status(400)
        res.json(err)
    }
})


Users.get('/:id', Auth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const user = await userStore.getUserById(id);
        res.json(user);
      } catch(err) {
        res.status(400)
        res.json(err)
    }
})

