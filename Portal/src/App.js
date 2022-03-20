import React from 'react';
import { BrowserRouter ,Route,Switch } from 'react-router-dom';
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import HomePage from './components/user/Homepage';
import ReportAnimal from './components/user/ReportAnimal';
import Forgotpassword from './components/user/Forgotpassword';
import CareSignIn from './components/carecenter/SignIn';
import CareSignUp from './components/carecenter/SignUp';
import Adoption from './components/user/Adoption';
import AdoptionStatus from './components/user/AdoptionStatus';
import ReportStatus from './components/user/ReportStatus';
import Profile from './components/user/Profile';
import Store from './components/user/Store'
import BuyCoins from './components/user/BuyCoins';
import Logout from './components/user/Logout';

// import UploadItems from './components/carecenter/BuyItem';
import UploadItem from './components/stores/UploadItems';
import BuyItem from './components/carecenter/BuyItem';
// import ReportedAnimals from './components/carecenter/ReportedAnimals';
import ViewReports from './components/carecenter/ViewReports';
import AdoptionRequests from './components/carecenter/AdoptionRequests';
// import Webcam from './components/user/Webcam';
function App() {
  return (
      <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      {/* <Route exact path="/" component={SignIn} /> */}
      <Route exact path="/" component={SignIn} />
      {/* <Route exact path="/carecenter/reportedAnimals" component={ReportedAnimals} /> */}
      <Route exact path="/user/home" component={HomePage} />
      <Route exact path='/user/profile' component={Profile}/>
      <Route exact path="/user/report" component={ReportAnimal} />
      <Route exact path="/user/reportStatus" component={ReportStatus} />
      <Route exact path="/user/adoption" component={Adoption} />
      <Route exact path="/user/store" component={Store} />
      <Route exact path="/user/buy" component={BuyCoins} />
      <Route exact path="/user/adoptionStatus" component={AdoptionStatus} />
      <Route exact path= "/user/logout" component={Logout} />
      <Route exact path="/forgotpassword" component={Forgotpassword} />
      <Route exact path="/carecenter/signup" component={CareSignUp} />
      <Route exact path="/carecenter/signin" component={CareSignIn} />
      <Route exact path="/carecenter/home" component={HomePage} />

      <Route exact path="/store/upload" component={UploadItem} />
      <Route exact path="/user/donate" component={BuyItem} />
      <Route exact path="/user/reportAnimal" component={ReportAnimal} />
      <Route exact path="/carecenter/viewReports" component={ViewReports} />
      <Route exact path="/carecenter/adoptionRequests" component={AdoptionRequests} />
      {/* <Route exact path="/carecenter/home" component={HomePage} /> */}
      </Switch>
    </div>
    </BrowserRouter>  
      
  );
}


export default App;
