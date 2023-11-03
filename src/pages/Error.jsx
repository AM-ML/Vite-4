import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export function PageError(props){
    return (
        <div className="container d-flex align-items-center">
            <Helmet>
                <title>InQuill - Error</title>
            </Helmet>
            <Link to="/" className="row text-dark">
                <div className="col-5 d-flex align-items-center">
                    <img src="/tree_2.svg" width="500" alt="Logo" />
                </div>
                <div className="col d-flex align-items-center">
                    <h2>
                        <b className="text-blue">
                            Error: 
                        </b>
                        &nbsp;
                        {props.msg ? props.msg : "Unkown"}
                    </h2>
                </div>
            </Link>
        </div>
    )
}
