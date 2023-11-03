import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export function isLoggedIn() {
    if(window.logged == true || (auth?.currentUser?.email != undefined) ) {
        return false;
    }

    return true;
}

const checkFunc = () => {
    const nav = useNavigate();
    
    if(window.logged == true || (auth?.currentUser?.email != undefined) ) {
        nav("/home");
    }
}