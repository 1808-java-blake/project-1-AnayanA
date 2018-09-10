import { connectionPool} from '../util/connection-util';
import { Reimb } from '../model/reimb';
import { reimbConverter} from '../util/reimb-converter';

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
            `SELECT * FROM ers.reimbursement WHERE reimb_author = $1`, [id]);
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
            `UPDATE ers.reimbursement 
            SET reimb_resolved = localtimestamp(0), reimb_resolver = $1, reimb_status = $2 
            WHERE reimb_id = $3`, [reimb.reimbResolver, reimb.reimbStatus, reimb.id]);
    } finally {
        client.release();
    }
  }

  /**
   * Add a new reimbursement
   */
export async function newReim(reimb: Reimb) {
const client = await connectionPool.connect();
console.log(reimb);
try {
    const resp = await client.query(
        `INSERT INTO ers.reimbursement (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status, reimb_type)
        VALUES ($1, localtimestamp(0), $2, $3, 'pending', $4)
        RETURNING reimb_id`,
        [reimb.amount, reimb.reimbDescription, reimb.reimbAuthor, reimb.reimbType]);
        console.log(resp.rows);
    return resp.rows[0].id;
} catch (err) {
    console.log(err);
} finally {
    client.release();
}
}