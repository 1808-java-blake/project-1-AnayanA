import * as React from 'react';

export class EmployeeComponent extends React.Component<any, any> {

  public constructor(props: any) {
    super(props);
    this.state = {
      reimbs: [],
    }
  }



  public componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    console.log(user.id);
    fetch(`http://localhost:3000/users/${user.id}`, {
      credentials: 'include'
    })
    .then(resp => resp.json())
    .then(reimbs => {
      this.setState({reimbs});
    })
    .catch(err => {
      console.log(err);
    })
  }

  public render() {
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
              this.state.reimbs.map((reimb: any) => (
                <tr key ={reimb.id}>
                  <td>{reimb.reimbType}</td>
                  <td> {reimb.reimbAmount} </td>
                  <td> {reimb.reimbDescription} </td>
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

