// import React from 'react';
import { useDispatch } from 'react-redux';
import authService from "../../appwrite/auth";
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        }).catch(error => {
            console.error("Logout failed: ", error);
        });
    };

    return (
        <div>
            <button onClick={logoutHandler} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
                Logout
            </button>
        </div>
    );
}

export default LogoutBtn;