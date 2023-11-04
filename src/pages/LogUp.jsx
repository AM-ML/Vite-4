import React, { useRef, useState } from 'react';
import "../styles/LogUp.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { GoogleProvider, auth } from '../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function LogUp() {
    const logEmailRef = useRef();
    const logPassRef = useRef();
    const navigate = useNavigate();
    const regEmailRef = useRef();
    const regPasswordRef = useRef();
    const [logAler, setLogAlert] = useState('');
    const [regAler, setRegAlert] = useState('');
    const [locked, setLocked] = useState(true);
    const signUpButton = useRef();
    const signInButton = useRef();
    const container =  useRef();
        function func1(){
            container.current.classList.add("right-panel-active");
        };
        
        
        function func2(){
            container.current.classList.remove("right-panel-active");
        };
        
    
    

    const signUp = async (e) => {
        e.preventDefault();

        let email = regEmailRef.current.value;
        let pwd = regPasswordRef.current.value;

      try{
          await createUserWithEmailAndPassword(auth, email, pwd);
          navigate("/");
      } catch (err){
          await console.error(err);
          await setRegAlert("email already in use")
      }
        email = "";
        pwd = "";
    }
    const signIn = async (e) => {
        e.preventDefault();
        const email = logEmailRef.current.value;
        const pwd = logPassRef.current.value;

        let nav = true;
        try { 
            await signInWithEmailAndPassword(auth, email, pwd);
            } catch (err) {
            console.error(err);
            await setLogAlert("Invalid Credentials!");
            nav = false;
        }
        if(nav) navigate("/");
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, GoogleProvider);
            navigate("/");
        } catch (err) {
            console.error(err);
            await setLogAlert("Unable to Log In!")
        }
    
    }
    
  return (
    <div className="container container-2" id="container" ref={container}>
        <div className="form-container sign-up-container">
            <form className="forrm" action="#" onSubmit={(e) => signUp(e)}>
                <h1 className="h1 font">Create Account</h1>
                <div className="social-container">
                    <a href="#" className="social aa"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" width={44} height={44} /></a>
                    <button type="button" onClick={() => loginWithGoogle()} className="social aa googleSocial"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"   width={44} height={44} /></button>
                    <a href="#" className="social aa"><img src="https://www.svgrepo.com/show/494278/linkedin-round.svg" width={44} height={44} /></a>
                </div>

                <div className="col-12 text-danger text-cnet">
                    {regAler}
                </div>

                <div className="input-group">
                    <input type="email" placeholder="Email" ref={regEmailRef} className="iinput"/>
                    <div type="button">
                        <FontAwesomeIcon className='ico' icon={faEnvelope} />
                    </div>
                </div>

                <div className="input-group">
                    <input type={locked? "password" : "text"} ref={regPasswordRef} placeholder="Password" className="mb-3 iinput" />
                    <div type="button"  onClick={() => setLocked(!locked)}>
                        <FontAwesomeIcon className='ico' icon={locked? faLock : faLockOpen} />
                    </div>
                </div>
                <button type="submit" className="subb btn-outline-primary buttton">Sign Up</button>
            </form>
        </div>


        {/* SIGN IN FORM */}


        <div className="form-container sign-in-container">
            <form className="forrm" onSubmit={(e) => signIn(e)}>
                <h1 className="h1">Sign in</h1>
                <div className="social-container">
                    <a href="#" className="social aa"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" width={44} height={44} /></a>
                    <button type="button" onClick={() => loginWithGoogle()} className="social aa googleSocial"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"   width={44} height={44} /></button>
                    <a href="#" className="social aa"><img src="https://www.svgrepo.com/show/494278/linkedin-round.svg" width={44} height={44} /></a>
                </div>

                <div className="col-12 text-danger text-center">
                    {logAler}
                </div>

                <div className="input-group">
                    <input type="email" placeholder="Email" ref={logEmailRef}  className="iinput"/>
                    <div type="button">
                        <FontAwesomeIcon className='ico' icon={faEnvelope} />
                    </div>
                </div>

                <div className="input-group">
                    <input type={locked? "password" : "text"} ref={logPassRef} placeholder="Password" className="mb-3 iinput" />
                    <div type="button"  onClick={() => setLocked(!locked)}>
                        <FontAwesomeIcon className='ico' icon={locked? faLock : faLockOpen} />
                    </div>
                </div>
                
                <button type="submit" className="subb btn-outline-primary buttton">Sign In</button>
            </form>
        </div>

        {/* REGISTER OVERLAY CONTAINER */}


        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome!</h1>
                    <p className="parag"><b>Please register an account to continue your journey with us</b></p>
                    <button className="ghost buttton" id="signIn" ref={signInButton} onClick={func2}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Welcome Back!</h1>
                    <p className="parag"><b>Login to continue back from where you left off</b></p>
                    <button className="ghost buttton" id="signUp" ref={signUpButton} onClick={func1}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>

  )
}
