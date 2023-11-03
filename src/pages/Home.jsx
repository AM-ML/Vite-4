import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useEffect } from 'react';

export function Home() {
	const nav = useNavigate();
       
	
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
		  if (!user) {
			nav('/login');
		  } 
		});
	
		return () => {
		  unsubscribe();
		};
	  }, [nav]);
	return (
		<div className="container">
			<Helmet>
				<title>InQuill</title>
			</Helmet>
			<div className="row">
				<div className="col">
					<h1>Home Page</h1>
				</div>
			</div>
		</div>
	)
}
