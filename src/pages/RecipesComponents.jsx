import { Rating } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom'

export function Recipe({id, img, title, chef, children}){
	return (
		<>
			<Link to={`/Recipes/${id}`} className="col-4 shadow-sm p-2 book onhover-darken bg-white">
					{children}
					<abbr title={"Chef: " + chef}>
            <img src={img ? img : "https://placehold.co/250x200"} width="250" height="200" alt="Recipe Cover" className="d-block m-auto text-center rounded-3" />
            <p className='text-center title text-capitalize text'>{title}</p>
            <Rating className="m-auto text-center place-content-center">
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star />
              <Rating.Star filled={false} />
            </Rating>
          </abbr>
			</Link>
		</>
	)
}

export function RecipePage(){
  const { RecipeId } = useParams();

  return (
    <div className="container min-100vh">
      <div className="row">
        <div className="col">
          <h1 className="text-center text-danger text-bold">
            Recipe '{RecipeId}'
          </h1>
        </div>
      </div>
    </div>
  )
}