import { Request, Response } from 'express';
import express from 'express';
import * as reimbDao from '../dao/reimb-dao';
import { authMiddleware } from '../security/authorization-middeware';

// router to imply reimbursements
export const reimbRouter = express.Router();

/**
 * Retrieves all reimburements
 */
reimbRouter.get((''), [
    authMiddleware('FManager'),
    async (req: Request, resp: Response) => {
        const status = '';
        console.log(status);
        try {
            console.log("retrieving all reimbursements");
            let reimbs = await reimbDao.findAll();
            resp.json(reimbs);
        } catch (err) {
            resp.sendStatus(500);
        }
    }
]);

/**
 * Retrieves reimbursments depending on status
 */
reimbRouter.get('/:status', [
    authMiddleware('FManager'),
    async (req: Request, resp: Response) => {
        const status = req.params.status;
        console.log(status);
        try {
            console.log("retrieving all reimbursements");
            let reimbs = await reimbDao.findFromStatus(status);
            resp.json(reimbs);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }
]);

/**
 * Gets reimbursements based on user id
 */

reimbRouter.get('/id/:id', [
    authMiddleware('employee'),
    async (req: Request, resp: Response) => {
        const id = +req.params.id; //convert the id to a number
        try {
            console.log("Retrieving users reimbs");
            const reimbs = await reimbDao.selectReimb(id);
            resp.json(reimbs);
        } catch (err) {
            resp.sendStatus(500);
        }
    }
]);

/**
 * Updates a reimbursement
 */
reimbRouter.post('/update/update', [
    authMiddleware('FManager'),
    async (req: Request, resp: Response) => {
        try {
            const id = await reimbDao.updateReimb(req.body);
            resp.status(201);
            resp.json(id);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }
]);

/**
 * Create reimbursement
 */
reimbRouter.post('/new', [
    authMiddleware('employee'),
    async (req: Request, resp: Response) => {
    try {
        console.log('adding reimbursment');
        const id = await reimbDao.newReim(req.body);
        resp.status(201);
        resp.json(id);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
}]);
