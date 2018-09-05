import { Request, Response } from 'express';
import express from 'express';
import * as userDao from '../dao/user-dao';

export const userRouter = express.Router();

/**
 * Find user by id
 */
userRouter.get('/:id', async (req,resp) => {
    const id = +req.params.id; //convert the id to a number
    try {
        let user = await userDao.findById(id);
        if (user !== undefined) {
            resp.json(user);
        } else {
            resp.sendStatus(400);
        }
    } catch (err) {
        resp.sendStatus(500);
    }
})

/**
 * Add a new user
 */
userRouter.post('', async (req, resp) => {
    try {
        const id = await userDao.create(req.body);
        resp.status(201);
        resp.json(id);
    } catch (err) {
        resp.sendStatus(500);
    }
})

/**
 * login in a user
 */
userRouter.post('/login', async (req, resp) => {
    try {
        const user = await userDao.findByUsernameAndPassword(req.body.username, req.body.password);

        if (user) {
            req.session.user = user;
            resp.json(user);
        } else {
            resp.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
})