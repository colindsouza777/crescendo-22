import react from 'react';
import { Redirect} from "react-router-dom";


function Logout(){
    localStorage.removeItem('token');
    return <Redirect to = "/care/signin"/>
}

export default Logout;