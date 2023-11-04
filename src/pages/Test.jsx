'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LoadingEffect } from './LoadingEffect';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiBookOpen, HiEye, HiNewspaper, HiArrowSmUp, HiUser } from 'react-icons/hi';

export function Test() {
    const nav = useNavigate();
    const go = (route) => {
        nav(route);
    }
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const [userBooks, setUserBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!auth.currentUser) {
                nav('/home');
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
        return window.BooksDB.filter((book) => book.uploader_email === currentUserEmail);
    };
    return (
        <div className="container">
            {loading ? <LoadingEffect /> : (
                <div className='container'>
                    <MainContent />
                </div>
            )}
        </div>
    );
}

const Item = (props) => {
    const {icon, msg, route} = props;
    return (
        <Link to={route}>
            <Sidebar.Item icon={icon}>
                {msg}
            </Sidebar.Item>
        </Link>
    )
}


const MainContent = () => {
    return (
        <div className="container mb-5">
            <div className="row shadow-lg rounded-3">
                <div className="col-4 px-0">
                    <div>
                        <Sidebar aria-label="Profile Sidebar" className='user-select-none'>
                        <h5 className="text-center text-white">Profile Information</h5>
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                            <Item icon={HiChartPie} msg="Dashboard" route="/test/dashboard" />
                            <Item icon={HiUser} msg="Account" route="/test/account" />
                            <Sidebar.Collapse icon={HiEye} label="Views">
                                <Item icon={HiBookOpen} msg="Books" route="/test/views/books" />
                                <Item icon={HiNewspaper} msg="Articles" route="/test/views/articles" />
                            </Sidebar.Collapse>
                            <Sidebar.Collapse icon={HiArrowSmUp} label="Uploads">
                                <Item icon={HiBookOpen} msg="Books" route="/test/uploads/books" />
                                <Item icon={HiNewspaper} msg="Articles" route="/test/uploads/articles" />
                            </Sidebar.Collapse>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                        </Sidebar>
                    </div>
                </div>
                <div className="col-8 p-3">
                    <div className="row">
                        {<Outlet />}
                    </div>
                </div>
            </div>
        </div>


    )
}
