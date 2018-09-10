import * as React from 'react';


export class ShowReimbs extends React.Component<any,{}> {

    public constructor(props: any) {
        super(props);
    }
    public render() {
        const { reimbs } = this.props;
        return (
            <div>
            <table className= "table table-dark col" id="reimb-table">
                <thead>
                <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody id="reimb-table-body">
                {
                    reimbs.map((reimb: any) => (
                    <tr key ={reimb.id}>
                        <td>{reimb.reimbType}</td>
                        <td> {reimb.reimbDescription} </td>
                        <td> {reimb.amount} </td>
                        <td> {reimb.reimbStatus} </td>
                    </tr>
                    ))
                } 
                </tbody>
            </table>
            </div>
        );
    }
}