import * as React from 'react';

export class FManagerComponent extends React.Component <any, any>{

    public constructor(props: any) {
      super(props);
      this.state = {
        reimbs: [],
      }
    }
  
    public accept = (e: number) => {

      let id = e;
      let reimbStatus = 'Accepted';
      const user = JSON.parse(localStorage.getItem("user") || '{}');
      let reimbResolver = user.id;
      const update = {id, reimbStatus, reimbResolver};

      fetch('http://localhost:3000/reimb/update/update', {
        body: JSON.stringify(update),
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      .then(resp => {
        this.componentDidMount();
        
      })
      .catch(err => {
        console.log(err);
      })
    }

    public deny = (e: number) => {

      let id = e;
      let reimbStatus = 'Denied';
      const user = JSON.parse(localStorage.getItem("user") || '{}');
      let reimbResolver = user.id;
      const update = {id, reimbStatus, reimbResolver};

      fetch('http://localhost:3000/reimb/update/update', {
      body: JSON.stringify(update),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      })
      .then(resp => {
        this.componentDidMount();
        
      })
      .catch(err => {
        console.log(err);
      })
    }
  
    public componentDidMount() {
      fetch(`http://localhost:3000/reimb/${''}`, {
        credentials: 'include',
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
        <div className= "container col5 align-self-center">
          <table className= "table table-dark col" id="reimb-table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">DateSubmitted</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
              <tbody id="table-body">
              {
                this.state.reimbs.map((reimb: any) => (
                  <tr key ={reimb.id} className='poppers' id={reimb.id} >
                    <td>{reimb.reimbType}</td>
                    <td> {reimb.amount} </td>
                    <td> {reimb.reimbDescription} </td>
                    <td> {reimb.dateSubmitted} </td>
                    <td> {reimb.reimbStatus} </td>
                    <td> <input onClick={() => this.accept(reimb.id)} type="submit" className="btn btn-outline-success btn-sm" value="Accept" />
                        <input onClick={() => this.deny(reimb.id)} type="submit" className="btn btn-outline-danger btn-sm" value="Deny"/></td>
                  </tr>
                ))
              } 
            </tbody>
          </table>
          
        </div>
      );
    }
  }
  
  
