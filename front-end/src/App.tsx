import * as React from 'react';
import './App.css';
import './include/bootstrap';

import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { EmployeeComponent } from './employee/employee.component';
import { FManagerComponent } from './FManager/FManger.components';
import { SignInComponent } from './signin/signin.component';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <div id ="main-content-container" >
            <Switch>
              <Route path="/employee" component={EmployeeComponent} />
              <Route path="/FManager" component={FManagerComponent} />
              <Route path="/signIn" component={SignInComponent} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
