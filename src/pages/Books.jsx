import { Book } from './Book.jsx';
import { auth } from '../config/firebase.js';
import { Helmet } from 'react-helmet';
import { useEffect, useState, useRef } from 'react';
import { LoadingEffect } from './LoadingEffect.jsx';
import { useNavigate } from 'react-router-dom';

export function Books() {
  const [BooksDB, setBooksDB] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const nav = useNavigate();
  const bottomRef = useRef(null);

  useEffect(() => {
    const waitForLoadedDB = async () => {
      while (!window.loadedDB) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms
      }

      try {
        setBooksDB(window.BooksDB);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        nav('/login');
      } else {
        waitForLoadedDB();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [nav]);


  

  return (
    <div className="container">
      <Helmet>
        <title>InQuill - Books</title>
      </Helmet>
      
      <div className="row mb-3">
        {BooksDB.map((book) => {
          const { id, cover, title, desc, author, sale } = book;
          if (sale && sale > 0)
            return (
              <Book
                key={id}
                id={id}
                cover={cover}
                title={title}
                desc={desc}
                author={author}
              >
                <small className="text-white bg-danger p-1 rounded-3 d-inline-block sale">
                  {sale}% off Sale
                </small>
              </Book>
            );
          return (
            <Book
              key={"book"+id}
              id={id}
              cover={cover}
              title={title}
              desc={desc}
              author={author}
            />
          );
        })}
      </div>
      <div ref={bottomRef}></div>
      {loading && <LoadingEffect />}
    </div>
  );
}
