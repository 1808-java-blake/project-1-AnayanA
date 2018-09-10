import * as React from 'react';
import { ShowReimbs } from '../employee/showReimb/showReimb.component';
import { RouteComponentProps } from '../../../node_modules/@types/react-router';

interface IState {
  newReimb: {
    amount: number,
    reimbDescription: string,
    reimbAuthor: number,
    reimbType: string,
    reimbStatus: string
  },
  reimbs: any,
  errorMessage: string,
}


export class EmployeeComponent extends React.Component<RouteComponentProps<{}> , IState> {

  public constructor(props: any) {
    super(props);  
    this.state = {
      errorMessage: '',

      newReimb: {
        amount: 0,
        reimbAuthor: 0,
        reimbDescription: '',
        reimbType: '',
        reimbStatus: 'pending'
      },
      reimbs: [],

    }
  }



public newDescrip = (e: any) => {
  this.setState({ ...this.state,
    newReimb: { ...this.state.newReimb,
      reimbDescription: e.target.value
    }
  });
}

public newAmount = (e: any) => {
  this.setState({ ...this.state,
    newReimb: { ...this.state.newReimb,
      amount: parseInt(e.target.value, 10)
    }
  });
}

public newType = (e: any) => {
  this.setState({ ...this.state,
    newReimb: { ...this.state.newReimb,
      reimbType: e.target.value
    }
  });
}

// public addId = (e: any) => {
//   const user = JSON.parse(localStorage.getItem("user") || '{}');
//  this.setState({ ...this.state,
//     newReimb: { ...this.state.newReimb,
//       reimbAuthor: user.id
//     }
//   });
//   console.log(this.state.newReimb.reimbAuthor);
// }

  public componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    fetch(`http://localhost:3000/reimb/id/${user.id}`, {
      credentials: 'include',
    })
    .then(resp => resp.json())
    .then(reimbs => {
      console.log(reimbs);
      this.setState({reimbs});
      this.setState({ ...this.state,
        newReimb: { ...this.state.newReimb,
          reimbAuthor: user.id
        }
      });
    })
    .catch(err => {
      console.log(err);
    })
  }

  public submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state.newReimb);
    fetch('http://localhost:3000/reimb/new', {
      body: JSON.stringify(this.state.newReimb),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    .then(resp => {
      console.log(resp.status)
      this.setState({
        ...this.state,
        reimbs: [...this.state.reimbs, this.state.newReimb]
      })
       
    })
    .catch(err => {
      console.log(err);
    })
}

  public render() {
    const { newReimb } = this.state;
    return (
      <div>
        <ShowReimbs reimbs = {this.state.reimbs} />
        <div>
          <button type="button" 
            className="btn btn-primary btn-lg"
            data-toggle="collapse" 
            data-target="#addReimbursement">
            New Reimbursement
          </button>

            <div className="collapse" id="addReimbursement">
              <div className="card card-body">
                  <form className="form-new-reimb" onSubmit={this.submit}>
                      <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="reimbDescription">Description</label>
                                <input
                                 onChange={this.newDescrip} value={newReimb.reimbDescription}
                                  type="text" className="form-control" id="reimbDescription"
                                  placeholder="Describe the purchase" required />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="reimbType">Type</label>
                              <select 
                                onChange={this.newType} 
                                id="reimbType" className="form-control" required>
                                  <option value="">Choose Type</option>
                                  <option value="Lodging">Lodging</option>
                                  <option value="Travel" >Travel</option>
                                  <option value="Food">Food</option>
                                  <option value="Other">Other</option>
                              </select>
                          </div>
                          <div className="form-group col-md-2">
                            <label htmlFor="reimbAmount">Amount</label>
                              <input 
                              onChange={this.newAmount} value={newReimb.amount}
                              type="number" className="form-control"
                              id="reimbAmount" required/>
                          </div>
                          </div>
                          <button type="submit" className="btn btn-primary">Submit Reimbursement</button>
                        </form>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

