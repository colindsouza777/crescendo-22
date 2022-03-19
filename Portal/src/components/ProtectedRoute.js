import react from 'react';
import {Route,Redirect} from 'react-router-dom';

const ProtectedRoute = ({component:Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') != undefined && localStorage.getItem('token') != null 
            ? (
            <Component {...props} />
            ) : (
            <Redirect to={{pathname: '/blocked', state: {from: props.location}}} />
            )
        }
        />
    );
    }

export default ProtectedRoute;