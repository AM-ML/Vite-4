import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../config/firebase";
import { LoadingEffect } from "./LoadingEffect";
import { NotFound } from "./NotFound";
import { MainArticle } from "./ArticleComponents";

export function ArticleSearch() {
  const nav = useNavigate();
  const db = window.ArticlesDB;
  
  let { target } = useParams();
  target = target.toLowerCase();

  const [found, setFound] = useState(false);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  const getTarget = () => {
    return window.ArticlesDB.filter(
      (art) =>
        art.headline.toLowerCase().includes(target) ||
        art.author.toLowerCase().includes(target)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) {
        nav("/home");
        return;
      }
    };

    fetchData();
  }, [nav]);

  useEffect(() => {
    if (window.loadedDB) {
      const articles = getTarget();
      if (articles.length >= 1) {
        setArticle(articles[0]);
        setFound(true);
      }
      setLoading(false);
    }
  }, [window.loadedDB]);

  if(!loading){
    if(found){
     return (
        <div className="container">
        <div className="row">
            <div className="col">
            <h1 className="text-center text-blue">
                <b>Results for '{target}'</b>
            </h1>
            </div>
        </div>
        <div className="row mt-4">
                <hr />
                <MainArticle db={db} id={article.id} img={article.img} headline={article.headline} body={article.body} author={article.author} />
            </div>
        </div>
     );
    } else {
        return <NotFound msg="Article Not Found." />
    }
  } else {
    return <LoadingEffect />
  }
}
