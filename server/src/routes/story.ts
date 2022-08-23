import { Response, Request, Router } from 'express';
import { StoryStore } from '../models/story'
import { Auth } from '../middleware/auth';


export const Stories: Router = Router();
const store = new StoryStore();

Stories.get('/all', Auth, async (req: Request, res: Response) => {
    try {
        const stories = await store.all();
        res.json(stories);
      } catch(err) {
        res.status(400)
        res.json(err)
    }
})

Stories.get('/:id', Auth, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const story = await store.getStoryById(id);
        res.json(story);
      } catch(err) {
        res.status(400)
        res.json(err)
    }
})


Stories.post('/', Auth, async (req: Request, res: Response) => {
    const { title, summary} = req.body;
    try {
        const story = await store.create(title,summary);
        res.json(story);
      } catch(err) {
        res.status(400)
        res.json(err)
    } 
})
