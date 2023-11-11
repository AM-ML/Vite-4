import React from 'react';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Recipe } from './RecipesComponents';
export const Recipes = () => {
    const url = "https://www.tasteofhome.com/wp-content/uploads/2018/07/The-Best-Ever-Tomato-Soup_EXPS_THSO18_222724_D03_06_5b-6.jpg";
    return (
        <div className="container min-100vh">
            <div className="row mb-5">
                <div className="col">
                    <h1 className="text-center text-danger text-bold user-select-none">
                        <FontAwesomeIcon icon={faUtensils} /> Recipes
                    </h1>
                </div>

                <div className="row mt-5 pt-3">
                    <Recipe id="1234" img={url} title="Tomato Soup" chef="Custom Chef" />
                    <Recipe id="1234" img={url} title="Tomato Soup" chef="Custom Chef" />
                    <Recipe id="1234" img={url} title="Tomato Soup" chef="Custom Chef" />
                </div>
            </div>
        </div>
    );
};

Recipes.displayName = 'Recipes';

