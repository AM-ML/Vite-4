import React from 'react'
import { useParams } from "react-router-dom"

export function RecipesSearch() {
  let { target } = useParams();

  target = target.toLowerCase();
  
  return (
    <div className="container min-100vh">
      <div className="row">
        <div className="col">
          <h1 className="text-center text-blue text-bold">
            Results for '{target}'
          </h1>
        </div>
      </div>
    </div>
  )
}
