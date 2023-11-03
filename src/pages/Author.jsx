import { getDocs, collection } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../config/firebase';
import { useEffect, useState } from 'react';
import { Book } from './Book';
import { LoadingEffect } from './LoadingEffect'; // You can create a LoadingEffect component as shown in a previous response.

export function Author() {
  const { authName } = useParams();
  const booksCollectionRef = collection(db, 'books');
  const [authBooks, setAuthBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getBooks();
      } else {
        // If the user is not logged in, navigate to the login page
        nav('/login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [nav]);

  const getBooks = async () => {
    const data = await getDocs(booksCollectionRef);
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const booksData = filteredData.filter((book) => book.author === authName);
    setAuthBooks(booksData);
    setLoading(false); // Mark loading as false when the operation is complete
  };

  return (
    <div className="container">
      <div className="row text-center py-2 mb-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="text-blue">{authName}</h3>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mb-3">
        {loading ? (
          <LoadingEffect /> // Display the loading effect while loading is true
        ) : (
          authBooks.map((book) => (
            <Book
              key={"author" + book.id}
              id={book.id}
              cover={book.cover}
              title={book.title}
              desc={book.desc}
              author={book.author}
              path={book.path}
            />
          ))
        )}
      </div>
    </div>
  );
}
