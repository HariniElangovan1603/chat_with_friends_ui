import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../apiConfig";
import Card from "./Card";


export default function Show() {
    let [posts, setPosts] = useState([]);
    const route = useNavigate();
    const userid = localStorage.getItem("userid");
   
    async function getPosts() {
      
        try {
            let res = await axios.get(`${apiUrl}/post`);
           setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    async function handleDelete(postid) {
        try {
            await axios.delete(`${apiUrl}/post/${postid}`);
            getPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    function handleUpdate(id) {
        localStorage.setItem("id", id);
        route("/edit");
    }



    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Posts</h2>
            <div className="row">
                {posts.map((post) => (
                    <div className="col-md-6 offset-md-3" key={post._id}>
                        <Card post={post } onDelete={handleDelete} onUpdate={handleUpdate} userid={userid}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
