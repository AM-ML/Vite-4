"use client";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Navbar, Footer } from "flowbite-react";
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
                 onClick={() => {window.getBooks();window.getArticles();nav("/")}}
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
              <Link to="/home">
                <Navbar.Link className="mb-2 nav-link">
                  Home
                </Navbar.Link>
                </Link>

                <Link to="/recipes">
                  <Navbar.Link className="mb-2 nav-link hover-danger">
                    Recipes
                  </Navbar.Link>
                </Link>
  
              <Link to="/books">
                <Navbar.Link className="mb-2 nav-link">
                  Books
                </Navbar.Link>
                </Link>
              <Link to="/articles">
                <Navbar.Link className="mb-2 nav-link hover-cyan">
                  Articles
                </Navbar.Link>
              </Link>
              <Link to="/profile">
                <Navbar.Link className="mb-2 nav-link hover-blue">
                  Profile
                </Navbar.Link>
              </Link>
                <Link to="/test" className="text-logout">
                  <Navbar.Link className="mb-2">
                      Test
                  </Navbar.Link>
                </Link>
              {user ? (
                  <Link to="/logout" className="text-logout">
                    <Navbar.Link className="mb-2">
                        Logout
                    </Navbar.Link>
                  </Link>
              ) : null}
            </Navbar.Collapse>
          </Navbar>
        </div>
        <hr />
        <div className="row">
          <Outlet />
        </div>
          <Footer container className="bg-none shadow-sm">
            <Footer.Copyright href="#" by="InQuill™" year={2023}  className="bg-none" />
            <Footer.LinkGroup  className="bg-none">
              <Footer.Link href="#"><Link to="/info/about">About</Link></Footer.Link>
              <Footer.Link href="#"><Link to="/info/privacy">Privacy</Link> Policy</Footer.Link>
              <Footer.Link href="#"><Link to="/info/contact">Contact</Link></Footer.Link>
              <Footer.Link href="#"><Link to="/info/licensing">Licensing</Link></Footer.Link>
            </Footer.LinkGroup>
        </Footer>      
      </div>
    </>
  );
}
