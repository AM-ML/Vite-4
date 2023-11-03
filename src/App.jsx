import { Link, Routes, Route } from 'react-router-dom';
import { MainLayout } from './pages/MainLayout'
import { Home } from './pages/Home'
import './App.css'
import { NotFound } from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { useEffect } from 'react';

import { auth } from './config/firebase';
import 'firebase/auth';
import { Navig } from './pages/Navig';
import { Logout } from './pages/Logout';
import { Books } from './pages/Books';
import { BookPage } from './pages/BookPage';
import { Author } from './pages/Author';
import { UploadBook } from './pages/UploadBook';
import { LogUp } from './pages/LogUp';

function App() {

  useEffect(() => {
    window.stop = false;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        window.logged = true;
      } else {
        window.logged = false;
      }
    });

    return () => {
      unsubscribe();
    };

  }, []);

  return (
    <>
      
      <hr />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}/>
          <Route path="home" element={<Home />}/>
          <Route path="books" element={<Books />} />
          <Route path="books/:bookId" element={<BookPage />}/>
          <Route path="books/author/:authName" element={<Author />} />
          <Route path="books/upload" element={<UploadBook />} />
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<Signup />}/>
          <Route path="test" element={<LogUp />} />
          <Route path="logout" element={<Logout />}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
