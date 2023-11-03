import { useEffect } from 'react';
import { SignupComponent } from './SignupComponent'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

export function Signup(){
    const nav = useNavigate();

    const checkFunc = () => {
        if(window.logged == true || (auth?.currentUser?.email != undefined) ) {
            nav("/home");
        }
    }
    
    useEffect(() => {
        checkFunc();
    }, [])

    return (
        <div className="container">
            <SignupComponent />
        </div>
    )
}