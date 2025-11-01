import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../apiConfig";

export default function Edit() {
    let [editpost, seteditpost] = useState([]);
    let route = useNavigate();

    function handleChange(e) {
        seteditpost({ ...editpost, [e.target.id]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(editpost);
        let id = localStorage.getItem("id");
        try {
            let res = await axios.put(`${apiUrl}/post/${id}`, editpost);
            console.log(res.data);
            route("/table");
        } catch (error) {
            console.error("Error updating post:", error);
        }
    }

    useEffect(() => {
        let id = localStorage.getItem("id");
        async function getusers() {
            try {
                const res = await axios.get(`${apiUrl}/post/${id}`);
                console.log(res.data);
                seteditpost(res.data[0]);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        }
        getusers();
    }, []);


    return (
        <>

            <div className="container mt-5">
                <h2>Edit a Post.</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mt-3">
                        <input type="radio" id="uploadtype" className="mx-2" name="uploadtype" value="image" onChange={handleChange} />
                        <label htmlFor="image">IMAGE</label>

                        <input type="radio" className="mx-2" id="uploadtype" name="uploadtype" value="video" onChange={handleChange} />
                        <label htmlFor="video">VIDEO</label>


                        <input type="text" className="form-control mt-2" id="upload" onChange={handleChange} value={editpost.upload} />

                    </div>

                    <div className="mt-3">
                        <label htmlFor="content" className="form-label"> Content</label>
                        <input type="text" className="form-control" id="content" placeholder="Write here..." onChange={handleChange} value={editpost.content || ""} />
                    </div>
                    <button className="btn btn-primary mt-3">Post</button>
                </form>
            </div>
        </>
    )
}