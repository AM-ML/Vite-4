import React, { useRef } from 'react';
import "../styles/LogUp.css";

export function LogUp() {
    const signUpButton = useRef();
    const signInButton = useRef();
    const container =  useRef();
        if (signUpButton.current) {
            signUpButton.current.addEventListener('click', () => {
                container.current.classList.add("right-panel-active");
            });
        }
        
        if (signInButton.current) {
            signInButton.current.addEventListener('click', () => {
                container.current.classList.remove("right-panel-active");
            });
        }
    
    

    const signUp = async (e) => {
        e.preventDefault();
    }
    const signIn = async (e) => {
        e.preventDefault();
    }
    
  return (
    <div className="container container-2" id="container" ref={container}>
        <div className="form-container sign-up-container">
            <form action="#" onSubmit={(e) => signUp(e)}>
                <h1 className="h1">Create Account</h1>
                <div className="social-container">
                    <a href="#" className="social aa"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" width={44} height={44} /></a>
                    <a href="#" className="social aa"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width={44} height={44} /></a>
                    <a href="#" className="social aa"><img src="https://www.svgrepo.com/show/494278/linkedin-round.svg" width={44} height={44} /></a>
                </div>
                <input type="email" placeholder="Email" className="iinput"/>
                <input type="password" placeholder="Password" className="mb-3 iinput" />
                <button type="submit" className="subb">Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form onSubmit={(e) => signIn(e)}>
                <h1 className="h1">Sign in</h1>
                <div className="social-container">
                    <a href="#" className="social aa"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" width={44} height={44} /></a>
                    <a href="#" className="social aa"><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"   width={44} height={44} /></a>
                    <a href="#" className="social aa"><img src="https://www.svgrepo.com/show/494278/linkedin-round.svg" width={44} height={44} /></a>
                </div>
                <input type="email" placeholder="Email"  className="iinput"/>
                <input type="password" placeholder="Password" className="mb-3 iinput" />
                <button type="submit" className="subb">Sign In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome!</h1>
                    <p>Please register an account to continue your journey with us</p>
                    <button className="ghost" id="signIn" ref={signInButton}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Welcome Back!</h1>
                    <p>Login to continue back where from where you left off</p>
                    <button className="ghost" id="signUp" ref={signUpButton}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>

  )
}
