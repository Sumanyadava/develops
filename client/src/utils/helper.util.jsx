import Cookies from 'js-cookie'
import NotAuth from '../components/NotAuth'

const authChecker = (ele) => {
  const authToken = Cookies.get('jwt_auth');

  if ( authToken == "null" ) {
    return (<NotAuth />) 
  }else{
    // console.log(authToken)
    return ele;
  }
}

export default authChecker