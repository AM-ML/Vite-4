import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleProvider, auth } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet";
import { Google } from "./Google";

export function SignupComponent() {
    const [aler, setAlert] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();


  const signup = async (e) => {
    e.preventDefault();
  
     let email = emailRef.current.value;
     let pwd = passwordRef.current.value;

        /*
          * arg1 of func is the auth service that relates the firebase app with the function, 
          * different auths connect or create acc with different apps 
        */


      try{
          await createUserWithEmailAndPassword(auth, email, pwd);
          navigate("/");
      } catch (err){
          await console.error(err);
          await setAlert("email already in use")
        await console.log(aler);

      }
        email = "";
        pwd = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";

    };

    const loginWithGoogle = async () => {
      try {
        await signInWithPopup(auth, GoogleProvider);
        navigate("/");
    } catch (err) {
        console.error(err);
        await setAlert("Unable to sign up");
        await console.log(aler);
      }
    }




    
  /***** UNIMPORTANT *****/

  const [showPassword, setShowPassword] = useState(false); // Add state for showing/hiding password
  const [lockOpen, setLockOpen] = useState(false);
  
  const inputType = showPassword ? "text" : "password";
  const lockIconAttrib = lockOpen? faLockOpen : faLock;
  const envIcon = <FontAwesomeIcon className="ico" icon={faEnvelope} />;
  const lockIcon = (
    <div
    type="button"
      className="ico mb-3"
      onClick={() => handleClick()}
      >
      <FontAwesomeIcon icon={lockIconAttrib} />
    </div>
  );
  function handleClick() {
    setShowPassword(!showPassword); // Toggle showing/hiding password
    setLockOpen(!lockOpen);
  }

  /***** UNIMPORTANT *****/

  return (
    <div className="container">
      <Helmet>
        <title>Sign Up - InQuill</title>
      </Helmet>
      <div className="row">
        <form
          onSubmit={(e) => signup(e)}
          className="container form shadow py-4 ps-4 w-400px h-350px rounded-4 "
        >
          <h1 className="text-center mb-3">Sign Up</h1>

          <div className="row">
            <div className="col">
              <p className="d-block w-100 text-center text-danger text-md">
                {aler}
              </p>
            </div>
          </div>

          <div className="row input-group px-4 mb-2">
            <input
              type="email"
              name="email"
              id="email"
              ref = {emailRef}
              placeholder="Email"
              className="form-control d-block"
            />
            {envIcon}
          </div> {/* Email #email n=email onChange=setEmail() */}

          <div className="row input-group px-4">
            <input
              type={inputType}
              name="password"
              id="password"
              placeholder="Password"
              minLength={8}
              ref = {passwordRef}
              maxLength={32}
              className="form-control d-block font-size-13px"
            />
            {lockIcon}
          </div> {/* Password */}


          <div className="row me-3 mt-4 pt-3 ms-auto text-end">
            <div className="col-8">
              <div className="w-100 text-center mt-2 font-size-13px">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </div>
            <div className="col-4">
              <button
                type="submit"
                className="btn btn-outline-primary w-100 d-block ms-auto me-4"
              >
                Sign Up
              </button> {/* Signup Submit Button */}
            </div>
          </div>
        </form>
      </div>
      <div className="row mt-3 mb-4">
        <Google func={loginWithGoogle} />
      </div>
    </div>
  );
}
