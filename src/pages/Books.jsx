import { Book } from './Book.jsx';
import { auth, db } from '../config/firebase.js';
import { Helmet } from 'react-helmet';
import { useEffect, useState, useRef } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { LoadingEffect } from './LoadingEffect.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export function Books() {
  const [BooksDB, setBooksDB] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [page, setPage] = useState(1); // Track the current page
  const booksCollectionRef = collection(db, 'books');
  const nav = useNavigate();
  const bottomRef = useRef(null);
  const isFetching = useRef(false); // Add a ref to track ongoing fetch
  const queryRef = useRef();
  const getBooks = async (page) => {
    if (isFetching.current) return; // If already fetching, do nothing
    isFetching.current = true; // Set fetching flag

    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Calculate the range of books to load
      const start = (page - 1) * 4;
      const end = start + 4;

      // Check if books for the current page have already been loaded
      const loadedBooks = BooksDB.length;
      if (start < loadedBooks) {
        isFetching.current = false; // Reset fetching flag
        return; // Books for this page have already been loaded
      }

      // Load books for the current page
      const booksToLoad = filteredData.slice(start, end);

      setBooksDB((prevBooks) => [...prevBooks, ...booksToLoad]);
      setPage(page + 1);
    } catch (err) {
      console.error(err);
    } finally {
      isFetching.current = false; // Reset fetching flag
      setLoading(false); // Mark loading as false when the operation is complete
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        nav('/login');
      } else {
        getBooks(page);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [nav, page]);

  // Use Intersection Observer to detect when the user reaches the bottom of the page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // User has reached the bottom, load more books
          getBooks(page);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [page]);

  function handleSearch(e){
    e.preventDefault();

    nav(`/books/search/${queryRef.current.value}`)
  }

  return (
    <div className="container">
      <Helmet>
        <title>InQuill - Books</title>
      </Helmet>
      <div className="row mb-5">
        <div className="col-lg-8 col-md-8 col-sm">
            <form className="container input-group" onSubmit={(e) => handleSearch(e)}>
              <input type="search" name="q" id="q" ref={queryRef} placeholder='Search Book...' className="form-control form-search book-search shadow-sm" />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='ico mb-3' />
            </form>
        </div>
        <div className="col-lg-4 col-md-4 col-sm">
          <div className='d-block w-100 m-auto text-center'>
            <Link to="/books/upload" className='text-center m-auto'>
              <button className="btn btn-dark d-inline-block m-auto">
                Upload A Book
              </button>
            </Link>
          </div>
        </div>
      </div>
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
