import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Test() {
  const nav = useNavigate();
  const go = false;
  useEffect(() => {
    if(go)
      nav("/home")
  })

  const [b, setB] = useState('');

  const box = useRef();

  const changeBox = (e) => {
    e.preventDefault();
    let boxScnd = box.current.value.replaceAll("\n", "\\n");

    setB(boxScnd);
  }

 const Main = () => {
  return (
      <div className="container text-center">

      <div className="row">
          <div className="col">
              <h2 className="bg-yellow-400 text-light p-3 rounded-3 text-center">{b}</h2>
          </div>
        </div>

        <div className="row">
          <div className="col">
          <form onSubmit={(e) => changeBox(e)}>
            <textarea rows="15" cols="50" className="bg-emerald-600 text-light p-5" ref={box} />
            <br />
            <button type="submit" value="submit" className="btn btn-outline-primary">Submit</button>
          </form>
          </div>
        </div>
      </div>
  )

}

const Header = () => {
  return (
      <div className="row">
        <div className="col">
            <h1 className="text-center text-blue-500">
                <b>
                    InQuill    
                </b>
            </h1>
            <hr />
        </div>
      </div>
    )
}
    return (
    <div className='container min-100vh'>
      <Header />
      <Main />
    </div>
  )

}

