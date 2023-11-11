import { Link } from 'react-router-dom'

export function Book({id, cover, title, desc, author, children}){
	return (
		<>
			<Link to={`/books/${id}`} className="col-3 shadow-sm p-2 book onhover-darken bg-white">
					{children}
				<abbr title={desc}>
					<img src={cover ? cover : "https://placehold.co/300x200"} width="300" height="200" alt="Book Cover" className="d-block m-auto text-center rounded-3" />
					<p className='text-center title text-capitalize'>{title}</p>
				</abbr>
			</Link>
		</>
	)
}
