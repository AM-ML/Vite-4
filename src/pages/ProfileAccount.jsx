import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { Chart } from "./ProfileDashboard";
import { DarkThemeToggle, Flowbite, Table } from 'flowbite-react';
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
        <div className="row mt-3 m-auto">
           <Table hoverable className="m-auto">
             
              <Table.Body className="divide-y">
                <Table.Row className="bg-white text-dark p-0">
                  <Table.Cell className="whitespace-nowrap font-medium text-center text-blue bg-light p-0">
                    <b>Email</b>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-600">
                    {currentUserEmail}
                  </Table.Cell>
                  <Table.Cell>
                    <button className="font-medium text-cyan-600 hover-scale dark:text-cyan-500">
                      Edit
                    </button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white text-dark">
                  <Table.Cell className="whitespace-nowrap font-medium text-center text-blue bg-light">
                    <b>Uploaded</b>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-600">
                    {userBooks.length == 1? "1 Book" : `${userBooks.length} Books`}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-600">
                    0 Articles
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
        </div>
        <div className="row mt-5">
        <div className="col">
          <h4 className="text-center text-blue">
            <b>Books / Articles Uploaded</b>
          </h4>
        </div>
      </div>

      <div className="row mt-3">
        <Chart v2={userBooks.length > 0? userBooks.length : 1 } m2="Books" v1={1} m1="Articles" />
      </div>
      </div>
    );
  };
  const Forgot = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col text-end pt-2">
            <p className="text-dark">Verify your email -></p>
          </div>
          <div className="col text-start pt-2">
            <button className="font-medium hover:underline hover-scale dark:text-green-600 mb-3">
              Verify
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col text-end pt-2">
            <p>Forgot your password?</p>
          </div>
          <div className="col pt-2">
           <button className="font-medium hover:underline hover-scale dark:text-blue-600 mb-3">
              Reset Password
            </button>
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
