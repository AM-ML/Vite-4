import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './pages/MainLayout'
import { Home } from './pages/Home'
import './App.css'
import { NotFound } from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { useEffect, useState } from 'react';
import { ArticleAuthor } from './pages/ArticleAuthor'
import { db } from './config/firebase';
import 'firebase/auth';
import { Logout } from './pages/Logout';
import { Books } from './pages/Books';
import { BookPage } from './pages/BookPage';
import { Author } from './pages/Author';
import { UploadBook } from './pages/UploadBook';
import { Search } from './pages/Search';
import { collection, getDocs } from 'firebase/firestore';
import { BookLayout } from './pages/BookLayout';
import { Profile } from './pages/Profile';
import { ProfileBlank } from './pages/ProfileBlank';
import { ProfileAccount } from './pages/ProfileAccount';
import { ProfileViews } from './pages/ProfileViews' 
import { ProfileDashboard } from './pages/ProfileDashboard' 
import { ProfileUploadsBooks } from './pages/ProfileUploadsBooks'
import { ProfileUploadsArticles } from './pages/ProfileUploadsArticles'
import { Test } from './pages/Test';
import { ProfileSales } from './pages/ProfileSales';
import { Articles } from './pages/Articles';
import { ArticlePage } from './pages/ArticlePage';
import { ArticleLayout } from './pages/ArticleLayout';
import { ArticleSearch } from './pages/ArticleSearch';
import { Recipes } from './pages/Recipes';
import { RecipesUpload } from './pages/RecipesUpload';
import { RecipesSearch } from './pages/RecipesSearch';
import { RecipesLayout } from './pages/RecipesLayout';
import { RecipePage } from './pages/RecipesComponents';
function App() {

  const [BooksDB, setBooksDB] = useState([]);
  const [ArticlesDB, setArticlesDB] = useState([]);
  const [loadedDB, setLoadedDB] = useState(false);

  const BooksCollectionRef = collection(db, 'books');
  const ArticlesCollectionRef = collection(db, 'articles');
  
  window.loadedDB = loadedDB;
  window.setLoadedDB = setLoadedDB;

  window.BooksDB = BooksDB;
  window.setBooksDB = setBooksDB;

  window.ArticlesDB = ArticlesDB;
  window.setArticlesDB = setArticlesDB;

  const getBooks = async () => {
    try {
      const data = await getDocs(BooksCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooksDB(filteredData);
      window.BooksDB = BooksDB;
      await window.setBooksDB(filteredData);
      window.loadedDB = loadedDB;
      await window.setLoadedDB(true);
      
    } catch (error) {
      console.error(error);
    }
  };
  const getArticles = async () => {
    try {
      const data = await getDocs(ArticlesCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setArticlesDB(filteredData);
      window.ArticlesDB = ArticlesDB;
      await window.setArticlesDB(filteredData);
      setLoadedDB(true);
      window.loadedDB = loadedDB;
      await window.setLoadedDB(true);
      
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    window.getBooks = getBooks;
    window.getArticles = getArticles;

    getBooks();
    getArticles();

  }, []);
  return (
    <>
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}/>
          <Route path="home" element={<Home />}/>
          <Route path="books" element={<BookLayout />}>
            <Route index element={<Books />} />
            <Route path=":bookId" element={<BookPage />}/>
            <Route path="author/:authName" element={<Author />} />
            <Route path="upload" element={<UploadBook />} />
          </Route>
          <Route path="books/search/:target" element={<Search />} />
          <Route path="login" element={<Login />}/>
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<Signup />}/>
          <Route path="profile" element={<Profile />} >
            <Route index element={<ProfileBlank />} />
            <Route path="dashboard" element={<ProfileDashboard />} />
            <Route path="account" element={<ProfileAccount />} />
            <Route path="views" element={<ProfileViews />} />
            <Route path="uploads/books" element={<ProfileUploadsBooks />} /> 
            <Route path="uploads/articles" element={<ProfileUploadsArticles />} />
            <Route path="sales" element={<ProfileSales />} />
          </Route>
          <Route path="articles" element={<ArticleLayout />} >
            <Route index element={<Articles />} />
            <Route path=":aid" element={<ArticlePage />} />
            <Route path="author/:author" element={<ArticleAuthor />} />
          </Route>
          <Route path="articles/search/:target" element={<ArticleSearch />} />
          <Route path="recipes" element={<RecipesLayout />}>
            <Route index element={<Recipes />} />
            <Route path="upload" element={<RecipesUpload />} />
            <Route path=":RecipeId" element={<RecipePage />} />
          </Route>
          <Route path="recipes/search/:target" element={<RecipesSearch/>} />
          <Route path="test" element={<Test />} />
          <Route path="logout" element={<Logout />}/>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
