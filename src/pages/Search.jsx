import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Book } from './Book';
import { LoadingEffect } from './LoadingEffect';
import { auth } from '../config/firebase';

export function Search() {
    let { target } = useParams();
    target = target.toLowerCase();
    const [loading, setLoading] = useState(true);
    const [targets, setTargets] = useState([]);
    const nav = useNavigate();
    const getTarget = () => {
        return window.BooksDB.filter(book => 
            book.title.toLowerCase().includes(target) ||
            book.desc.toLowerCase().includes(target) ||
            book.author.toLowerCase().includes(target)
            )    
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
            const books = getTarget();
            setTargets(books);
            setLoading(false);
        }
    }, [window.loadedDB]);


    return (
    <div className="container">
        {loading ? <LoadingEffect /> : (
                <div className='container'>
                    
                    <div className="row mb-5">
                        <div className="col">
                            <h1>Results for '{target}': {targets.length == 1? "1 result": `${targets.length} results`}</h1>
                        </div>
                    </div>

                    <div className="row mb-3">
                        {targets.map((book) => (
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
            )}
    </div>  )
}
