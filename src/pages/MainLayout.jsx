"use client";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import { useAuthState } from "react-firebase-hooks/auth"; // If available
import { auth } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faRotateForward,
} from "@fortawesome/free-solid-svg-icons";

export function MainLayout() {
  // Use the auth state from Firebase
  const [user] = useAuthState(auth);
  const nav = useNavigate();

  return (
    <>
      <div className="container">
        <div className="row">
          <Navbar fluid rounded className="bg-dark">
            <div className="">
              <div className="float-left navig">
                <button
                  className="text-dark onhover-lighten  w-min me-3"
                  onClick={() => nav(-1)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  className="text-dark onhover-lighten w-min me-4"
                  onClick={() => nav(1)}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <button
                 className="text-dark onhover-lighten w-min"
                 onClick={() => {window.getBooks();nav("/")}}
                  >
                  <FontAwesomeIcon icon={faRotateForward} />
                </button>
              </div>
              <Link to="/">
                <Navbar.Brand>
                  <img
                    src="/tree.svg"
                    className="mr-3 h-6 sm:h-9 me-3 ms-3"
                    alt="Flowbite React Logo"
                  />
                  <span className="self-center mb-2 whitespace-nowrap text-xl font-semibold dark:text-white">
                    InQuill
                  </span>
                </Navbar.Brand>
              </Link>
            </div>

            <div className="flex md:order-2">
              {!user ? (
                <>
                  <Link to="/login">
                    <Button className="btn btn-sm me-5">Login</Button>
                  </Link>
                </>
              ) : null}
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
              <Navbar.Link className="mb-2 text-secondary" active>
                <Link to="/">Home</Link>
              </Navbar.Link>
              <Navbar.Link className="mb-2 text-secondary" href="#">
                <Link to="/books">Books</Link>
              </Navbar.Link>
              <Navbar.Link className="mb-2 text-secondary" href="#">
                <Link to="/profile">Profile</Link>
              </Navbar.Link>
              <Navbar.Link className="mb-2" href="#">
                <Link to="/test" className="text-logout">
                  Test
                </Link>
              </Navbar.Link>
              {user ? (
                <Navbar.Link className="mb-2" href="#">
                  <Link to="/logout" className="text-logout">
                    Logout
                  </Link>
                </Navbar.Link>
              ) : null}
            </Navbar.Collapse>
          </Navbar>
        </div>
        <hr />
        <div className="row">
          <Outlet />
        </div>
      </div>
    </>
  );
}
