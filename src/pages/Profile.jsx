import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { LoadingEffect } from './LoadingEffect';
import { Book } from './Book';

export function Profile() {
    const nav = useNavigate();
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
                <>
                    <div className="row">
                        <h1 className="text-primary">Statistics</h1>
                    </div>
                    <ul className="container">
                        <li className="row">
                            <div className="col-3 text-end">Email: </div>
                            <div className="col-3 text-start">{currentUserEmail}</div>
                        </li>
                        <li className="row">
                            <div className="col-3 text-end">Uploaded: </div>
                            <div className="col-3 text-start">
                                {userBooks.length === 1 ? "1 book" : `${userBooks.length} books`}
                            </div>
                        </li>
                    </ul>

                    <div className="row">
                        <div className="col">
                            <h1 className="text-primary">Uploaded Books: </h1>
                        </div>
                    </div>

                    <div className="row mb-3">
                        {userBooks.map((book) => (
                            <Book
                                key={book.id}
                                id={book.id}
                                cover={book.cover}
                                title={book.title}
                                desc={book.desc}
                                author={book.author}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
