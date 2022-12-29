import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const selectorIsLoggedIn = (state) => state.auth?.isLoggedIn;
const selectorUserData = (state) => state.auth?.user?.data;

export const Profile = () => {
    const isLoggedIn = useSelector(selectorIsLoggedIn);
    const userData = useSelector(selectorUserData);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
    <div className="container">
        <header className="jumbotron">
        <h3>
            <strong>{userData.username}</strong> Profile
        </h3>
        </header>
        <p>
        <strong>Token:</strong> {userData.accessToken.substring(0, 20)} ...{" "}
        {userData.accessToken.substr(userData.accessToken.length - 20)}
        </p>
        <p>
        <strong>Email:</strong> {userData.email}
        </p>
        <p>
        <strong>Authorities:</strong> {userData.role}
        </p>
    </div>
    );
}