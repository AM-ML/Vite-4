import React, { useRef } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export function BookLayout() {

    const nav = useNavigate();
    const queryRef = useRef();

    
    function handleSearch(e){
        e.preventDefault();
    
        nav(`/books/search/${queryRef.current.value}`)
      }
    
  return (
    <div className='container'>
      <div className="row mb-5">
        <div className="col-lg-8 col-md-8 col-sm">
            <form className="container input-group" onSubmit={(e) => handleSearch(e)}>
              <input type="search" name="q" id="q" ref={queryRef} placeholder='Search Book...' className="form-control form-search book-search shadow-sm" />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='ico mb-3' />
            </form>
        </div>
        <div className="col-lg-4 col-md-4 col-sm">
          <div className='d-block w-100 m-auto text-center'>
            <Link to="/books/upload" className='text-center m-auto'>
              <button className="btn btn-dark d-inline-block m-auto">
                Upload A Book
              </button>
            </Link>
          </div>
        </div>
      </div>
        <div className="row mb-3">
            <Outlet />
        </div>
    </div>
  )
}
