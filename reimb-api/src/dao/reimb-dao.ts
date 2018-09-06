import { connectionPool} from '../util/connection-util';
import { Reimb } from '../model/reimb';
import { reimbConverter} from '../util/reimb-converter';
import { SqlReimb } from "../dto/sql-reimb";

/**
 * Retrieve all reimbursements or reimbursements depending on status
 *
 */
//
export async function findAll(): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`SELECT * FROM ers.reimbursement`);
        return resp.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}


export async function findFromStatus(status: string): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ers.reimbursement 
            ${(status === '') ? '' : `WHERE reimb_status = $1`}`, [status]);
        return resp.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}


 /**
  * Retrieves all or select reimbursements submitted by a user
  */
export async function selectReimb(id: number): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ers.reimbursement WHERE user_id = $1`, [id]);
        return resp.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}


 /**
  * Update reimbursement
  */

  export async function updateReimb(reimb: Reimb): Promise<any> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `UPDATE reimbursement 
            SET reimb_resolved = $1, reimb_ resolver = $2, reimb_status = $3 
            WHERE reimb_id = $4`, [reimb.dateResolved, reimb.reimbResolver, reimb.reimbStatus, reimb.id]);
    } finally {
        client.release();
    }
  }

  /**
   * Add a new reimbursement
   */
export async function newReim(reimb: Reimb): Promise<number> {
const client =await connectionPool.connect();
try {
    const resp = await client.query(
        `INSERT INTO ers.reimbursement (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status, reimb.type)
        VALUE ($1, $2, $3, $4, $5, $6)`
        [reimb.amount, reimb.dateSubmitted, reimb.reimbDesciption, reimb.reimbAuthor, reimb.reimbStatus, reimb.reimbType]);
    return resp.rows[0].id;
} finally {
    client.release();
}
}