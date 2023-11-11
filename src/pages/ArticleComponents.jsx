import { Link } from "react-router-dom";
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


export function MainArticle(props){
    return (
        <article className="container min-100vh">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-blue"><b>{props.headline}</b></h2>
                </div>
                <div className="col-12">
                    <Link to={`/articles/author/${props.author}`}>
                        <p className="text-primary text-end pe-3">by {props.author}</p>
                    </Link>
                </div>
                <div className="row mt-2">
                    <div className="col d-flex align-items-center">
                        <img src={props.img} alt="Article Image" width={800} height={266} className="img shadow-lg mb-5 d-block m-auto" />
                    </div>
                </div>
                <div className="row">
                    <div className="ms-5 col-4 sideArts">
                        <h3 className="mb-3"><b className="blue-border-bottom">Other Articles</b></h3>
                        <SideArticles db={props.db} />
                    </div>
                    
                    <div className="col-7">
                        <p className="main-text">
                            {props.body.split('\\n').map((item, key) => (
                                <span key={key}>
                                    {item}
                                    <br />
                                    <br />
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    )
}
export function SideArticles(props) {
    return(
        <div className="container">
            {props.db.map((article) => (
                <Article key={article.id + "." + getRandomInt(1, 1000)} id={article.id} img={article.img} headline={article.headline} author={article.author} />
             ))}
        </div>
    )
}

export function Article(props){
    const { id, img, headline, author} = props;
    let truncatedHeadline = headline.length > 20 ? headline.slice(0, 26) + "..." : headline;
    let style={}
    if(props.sign == "true"){
        truncatedHeadline = headline.length > 200 ? headline.slice(0, 200) + "..." : headline
    }

    return (
        <Link to={`/articles/${id}`} className="container">
            <figure className="row">
                <div className="col">
                <img src={img} alt="Image" width={300} height={200} />
                </div>
                <div className="col">
                <figcaption><abbr title={headline} className="lh-1 onhover-lighten">{truncatedHeadline} <small className="small w-max d-block"> <br/><b> {author? "- " + author : ""}</b></small></abbr></figcaption>
                </div>
            </figure>
        </Link>
    );
}

