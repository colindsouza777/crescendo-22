import react from 'react';
import { Redirect} from "react-router-dom";


function Logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id_user');
    return <Redirect to = "/"/>
}

export default Logout;