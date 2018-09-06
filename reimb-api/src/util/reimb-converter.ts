import { Reimb } from '../model/reimb';
import { SqlReimb } from "../dto/sql-reimb";

/**
 * Used to convert the reimbursment to be usable on the front-end
 */
export function reimbConverter(reimb: SqlReimb) {
    return new Reimb(reimb.reimb_id, reimb.reimb_amount, reimb.reimb_submitted, reimb.reimb_resolved, reimb.reimb_description, 
        reimb.reimb_author, reimb.reimb_resolver, reimb.reimb_status, reimb.reimb_type);

}