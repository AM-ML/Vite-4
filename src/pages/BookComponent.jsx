import React from 'react';
import { Link } from 'react-router-dom';

export function BookComponent(props) {
  const { id, cover, title, desc, author, sale, path } = props;
  const disabled = path ? false : true;

  // Function to add <br> after every 3 periods
  const formatDescription = (description) => {
    const sentences = description.split('.');
    const formattedDescription = [];
    for (let i = 0; i < sentences.length; i++) {
      formattedDescription.push(sentences[i] + '.');
      if ((i + 1) % 3 === 0 && i + 1 < sentences.length) {
        formattedDescription.push(<br key={`br-${i+"one"}`} />);
      }
      if ((i + 1) % 6 === 0 && i + 1 < sentences.length) {
        formattedDescription.push(<br key={`br-${i+"two"}`} />);
      }
    }
    return formattedDescription;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-capitalize text-blue">
            {title} <br />
            <Link to={`/books/author/${author}`} className="text-blue line-03">
              <h6>by {author}</h6>
            </Link>
          </h1>
        </div>
      </div>
      <div className="row mb-5 mt-2">
        <div className="col-3">
          {sale ? (
            <caption className="text-white bg-danger rounded-3 p-1 text-center d-block mb--1">
              {sale}% off Sale!
            </caption>
          ) : (
            ''
          )}
          <img
            src={cover ? cover : 'https://placehold.co/200x230'}
            alt="Book Cover"
            className="rounded-5 d-block mt-4"
          />
          <a
            href={`/${path}`}
            className={`btn btn-lg btn-danger ${disabled ? 'disabled-link' : ''} d-block w-100 mt-3`}
            disabled={disabled}
          >
            Download Book
          </a>
        </div>
        <div className="col-8 pt-4">
          <h3>Description</h3>
          <p className="indent-20">{formatDescription(desc)}</p>
        </div>
      </div>
    </div>
  );
}
