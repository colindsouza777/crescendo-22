import React from 'react';
import { BrowserRouter ,Route,Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Forgotpassword from './components/Forgotpassword';
function App() {
  return (
      <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/" component={SignIn} />
      <Route exact path="/forgotpassword" component={Forgotpassword} />
      </Switch>
    </div>
    </BrowserRouter>  
      
  );
}


export default App;
