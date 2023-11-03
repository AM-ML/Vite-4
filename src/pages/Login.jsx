import { useEffect, useState } from 'react'
import { LoginComponent } from './LoginComponent'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

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
            <LoginComponent />
        </div>
    )
}