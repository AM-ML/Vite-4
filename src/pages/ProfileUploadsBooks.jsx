import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Book } from './Book';
import { auth } from '../config/firebase';

export function ProfileUploadsBooks() {
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
    <div className='contianer'>
      <div className="row">
        <div className="col">
            <h1 className="text-center text-blue"><b>Uploaded Books</b></h1>
        </div>
      </div>
      <div className="row mb-3 mt-5">
                        {userBooks.length == 0? <h4 className="text-center"><b>No Books Uploaded</b></h4>: userBooks.map((book) => (
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
    </div>
  )
}
