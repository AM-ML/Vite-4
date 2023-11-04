import { useEffect } from 'react'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { LogUp } from './LogUp';

export function Login(){
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
            <LogUp />
        </div>
    )
}