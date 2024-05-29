import Cookies from 'js-cookie'
import NotAuth from '../components/NotAuth'

const authChecker = (ele) => {
  if (!Cookies.get('userDATA')) {
    return (<NotAuth />) 
  }else{
    return ele;
  }
}

export default authChecker