import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Chart } from "./ProfileDashboard";

export function ProfileAccount() {
  const nav = useNavigate();
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) {
        nav("/home");
        return;
      }

      setCurrentUserEmail(auth.currentUser.email);
    };

    fetchData();
  }, [nav]);

  useEffect(() => {
    if (currentUserEmail && window.loadedDB) {
      const books = getUserBooks();
      setUserBooks(books);
      setLoading(false);
    }
  }, [currentUserEmail, window.loadedDB]);

  const getUserBooks = () => {
    return window.BooksDB.filter(
      (book) => book.uploader_email === currentUserEmail
    );
  };

  const Stats = () => {
    return (
      <div className="container">
        <div className="row mt-3">
          <table className="table table-light table-bordered p-3">
            <tbody>
              <tr>
                <th className="p-3 table-primary-c">Email</th>
                <td className="p-3">{currentUserEmail}</td>
                <th className="m-0 p-0 centers table-primary-c">
                  <button 
                    className="btn btn-primary w-100 h-60px center"
                    >
                    <b>Edit</b>
                  </button>
                </th>
              </tr>
              <tr>
                <th className="p-3 table-primary-c">Uploaded</th>
                <td className="p-3">
                  {userBooks.length == 1
                    ? "1 book"
                    : `${userBooks.length} books`}
                </td>
                <th className="p-3 text-center table-primary-c" colSpan={1}>
                  0 articles
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row mt-5">
        <div className="col">
          <h4 className="text-center text-blue">
            <b>Books / Articles Uploaded</b>
          </h4>
        </div>
      </div>

      <div className="row mt-3">
        <Chart v2={userBooks.length} m2="Books" v1={1} m1="Articles" />
      </div>
      </div>
    );
  };
  const Forgot = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col text-end pt-2">
            <p>Verify your email:</p>
          </div>
          <div className="col">
            <button className="btn btn-success">Verify Email</button>
          </div>
        </div>
        <div className="row">
          <div className="col text-end pt-2">
            <p>Forgot your password?</p>
          </div>
          <div className="col">
            <button className="btn btn-primary">Reset Password</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row mt-3 mb-3">
        <div className="col">
          <h1 className="text-center text-blue">
            <b>Account</b>
          </h1>
        </div>
      </div>
      <hr className="m-0" />
      <div className="row" style={{ "margin-top": "5px" }}>
        <Stats />
        <footer className="mt-5">
          <Forgot />
        </footer>
      </div>
    </div>
  );
}
