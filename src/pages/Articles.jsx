import { Helmet } from 'react-helmet'
import { MainArticle } from './ArticleComponents'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../config/firebase'; // Make sure to import 'auth' from your Firebase configuration.

export function Articles() {
    const nav = useNavigate();
    const [db, setDB] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const waitForLoadedDB = async () => {
            try {
                while (!window.loadedDB) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                setDB(window.ArticlesDB);
                setLoading(false);
            } catch (err) {
                console.error(err);
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

    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while waiting for data.
    }

    const article = db[db.length - 1];

    return (
        <div className="container">
            <Helmet>
                <title>InQuill - Articles</title>
            </Helmet>
            <div className="row p-2 rounded-3">
                <div className="col text-center">
                    <h2><b className='blue-border-bottom ch-14'>Latest Article</b></h2>
                </div>
            </div>
            <div className="row mt-4">
                <MainArticle db={db} id={article.id} img={article.img} headline={article.headline} body={article.body} author={article.author} />
            </div>
        </div>
    )
}
