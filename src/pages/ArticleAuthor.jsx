import { useEffect, useState, useRef } from 'react';
import { LoadingEffect } from './LoadingEffect.jsx';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase.js';
import { Article } from './ArticleComponents'
export function ArticleAuthor() {
  const { author } = useParams();
  const [loading, setLoading] = useState(true);
  const [articlesDB, setArticlesDB] = useState([]);
  const [articles, setArticles] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const waitForLoadedDB = async () => {
      while (!window.loadedDB) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms
      }

      try {
        setArticlesDB(window.ArticlesDB);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const arts = getArticles();
    setArticles(arts);

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

  const getArticles = () => {
    return articlesDB.filter((article) => article.author.toLowerCase() === author.toLowerCase()); // Use 'articlesDB' instead of 'ArticlesDB' and fix the comparison operator
  };

  if (loading) {
    return <LoadingEffect />;
  }

  return (
    <div className="container min-100vh">
      <div className="row">
        <div className="col">
          <h1 className="text-center text-blue">
            <b className="blue-border-bottom w-ch">{author}</b>
          </h1>
        </div>
      </div>
      <div className="row mt-5 pt-3">
      	{articlesDB.map((article) => {
      		return (<div className="col-6">
	      			<Article sign={"true"} id={article.id} img={article.img} headline={article.headline} body={article.body} author="" />
      			</div>)
      	})}
      </div>
    </div>
  );
}
