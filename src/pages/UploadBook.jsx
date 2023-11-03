import { useState } from "react"
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export function UploadBook() {
    const booksCollectionRef = collection(db, 'books');
    const [cover, setCover] = useState(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState('');
    const [author, setAuthor] = useState('');
    const [didUpload, setDidUpload] = useState(true);

    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            await addDoc(booksCollectionRef, {"cover": cover != null? cover : null, "title": title, "desc": desc, "author": author});
        } catch (err) {
            setDidUpload(false);
            alert("Error uploading book!")
            console.log(err);
        }

        if(didUpload)
            alert("Uploaded new book")
    }

  return (
    <form className="container" onSubmit={(e) => handleUpload(e)}>
        <div className="row mb-3">
            <div className="col-lg-2 col-md-2 col-sm-3">
                <label htmlFor="img">Cover </label>
            </div>
            <div className="col">
                <input onChange={(e) => setCover(e.target.value)} type="file" name="img" id="img" className="form-control book-search m-auto" />
            </div>
        </div>

        <div className="row mb-3">
            <div className="col-lg-2 col-md-2 col-sm-3">
                    <label htmlFor="title">Title</label>
            </div>
            <div className="col">
                <input minLength={5} onChange={(e) => setTitle(e.target.value)} required type="text" name="title" placeholder="Title..." id="title" className="form-control book-search m-auto" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-lg-2 col-md-2 col-sm-3">
                    <label htmlFor="author">Author</label>
            </div>
            <div className="col">
                <input onChange={(e) => setAuthor(e.target.value)} required type="text" name="authors" placeholder="Author..." id="author" className="form-control book-search m-auto" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-lg-2 col-md-2 col-sm-3">
                    <label htmlFor="description">Description</label>
            </div>
            <div className="col">
                <textarea minLength={200} onChange={(e) => setDesc(e.target.value)} required cols="50" rows="15" type="text" maxLength={2000} name="description" placeholder="Description..." id="description" className="p-3 form-control book-search m-auto" />
            </div>
        </div>
        <div className="row mb-5">
            <div className="col">
                <button type="submit" className="btn btn-primary float-right float-end d-block zoom-14">Upload Book</button>
            </div>
        </div>
    </form>
  )
}
