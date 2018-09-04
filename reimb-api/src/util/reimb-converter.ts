import { Reimb } from '../model/reimb';
import { SqlReimb } from "../dto/sql-reimb";

/**
 * Used to convert the reimbursment to be usable on the front-end
 */
export function reimbConverter(reimb: SqlReimb) {
    return new Reimb(reimb.id, reimb.amount, reimb.dateSubmitted, reimb.dateResolved, reimb.reimbDesciption, 
        reimb.reimbAuthor, reimb.reimbResolver, reimb.reimbStatus, reimb.reimbType);

}