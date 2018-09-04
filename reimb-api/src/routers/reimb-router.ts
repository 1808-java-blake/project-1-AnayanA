import { Request, Response } from 'express';
import express from 'express';
import * as reimbDao from '../dao/reimb-dao';
import { authMiddleware } from '../security/authorization-middeware';

// router to imply reimbursements
export const reimbRouter = express.Router();

/**
 * Retrieves all reimburements
 */
reimbRouter.get('', [
    authMiddleware('FManager'),
    async (req: Request, resp: Response) => {
        try {
            console.log("Customer movie retrieval");
            let reimbs = await reimbDao.findAll(status);
            resp.json(reimbs);
        } catch (err) {
            resp.sendStatus(500);
        }
    }
]);

reimbRouter.get('', [
    authMiddleware('employee'),
    async (req: Request, resp: Response) => {
        try {
            console.log("Customer movie retrieval");
            let reimbs = await reimbDao.selectReimb(id, status);
            resp.json(reimbs);
        } catch (err) {
            resp.sendStatus(500);
        }
    }
]);


 /**
  * Find reimbursement by id
  */


/**
 * Updates a reimbursement
 */


/**
 * Create reimbursement
 */

