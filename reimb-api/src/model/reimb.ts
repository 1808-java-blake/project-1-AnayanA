export class Reimb {
    id = 0;
    amount = 0;
    dateSubmitted: {};
    dateResolved = {};
    reimbDesciption = '';
    reimbAuthor = 0;
    reimbResolver = 0;
    reimbStatus = '';
    reimbType = '';

    constructor(id?: number,amount?: number, dateSubmitted?: object, dateResolved?: object, reimbDescription?: string,
      reimbAuthor?: number, reimbResolver?: number, reimbStatus?: string, reimbType?: string) {
        id && (this.id = id);
        amount && (this.amount = amount);
        dateSubmitted && (this.dateSubmitted = dateSubmitted);
        dateResolved && (this.dateResolved = dateResolved);
        reimbDescription && (this.reimbDesciption = reimbDescription);
        reimbAuthor && (this.reimbAuthor = reimbAuthor);
        reimbResolver && (this.reimbResolver = reimbResolver);
        reimbStatus && (this.reimbStatus = reimbStatus);
        reimbType && (this.reimbType = reimbType);
    }
}