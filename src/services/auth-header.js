import { useSelector } from 'react-redux';


const selectorUserData = (state) => state.auth?.user?.data;

export const AuthHeader = () => {
  
  const user = useSelector(selectorUserData);
  // const user = JSON.parse(localStorage.getItem('user'));
  console.log('user', user)

  if (user && user.accessToken) {
    // for Node.js Express back-end
    console.log('token', user.accessToken)
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}