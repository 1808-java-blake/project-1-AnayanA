import * as React from 'react';
import './App.css';
import './include/bootstrap';

import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { EmployeeComponent } from './components/employee/employee.component';
import { FManagerComponent } from './components/FManager/FManager.components';
import  SignInComponent  from './components/signin/signin.component';
import { Provider } from 'react-redux';
import { store } from './store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
