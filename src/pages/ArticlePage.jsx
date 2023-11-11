import { useNavigate, useParams } from "react-router-dom";
import { MainArticle } from "./ArticleComponents";
import { NotFound } from "./NotFound";
import { Helmet } from "react-helmet";
import { auth } from "../config/firebase";
import { LoadingEffect } from "./LoadingEffect";
import { useEffect, useState } from "react";

export function ArticlePage() {
    const { aid } = useParams(); // Use 'aid' instead of 'artID'
    const nav = useNavigate();
    const [article, setArticle] = useState({}) 
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(false);
    const getTarget = () => {
        return window.ArticlesDB.filter((article) => article.id.toString() === aid.toString());
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!auth.currentUser) {
                nav('/home');
                return;
            }

        };

        fetchData();
    }, [nav]);

    useEffect(() => {
        if (window.loadedDB) {
            const articles = getTarget();
            if (articles.length === 1) {
                setFound(true);
                setArticle(articles[0]);
            }
            setLoading(false);
        }
    }, [window.loadedDB, aid]);

    if(!loading){
        if (found) {
            const { id, img, headline, body, author } = article;
            return (
                <div className="container">
                    <Helmet>
                        <title>InQuill - Article</title>
                    </Helmet>
                    <MainArticle db={window.ArticlesDB} id={id} img={img} headline={headline} body={body} author={author} />
                </div>
            );
        } else {
            return <NotFound msg="Article Not Found"/>
        }
    } else {
        return <LoadingEffect />
    }
}
