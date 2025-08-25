import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../apiConfig";

export default function Post() {
    let [data, setdata] = useState([]);
    const [user, setuser] = useState([]);
    let route = useNavigate();

    async function getuser() {
        try {
            let res = await axios.get(`${apiUrl}/users`, user);
            setuser(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    function handleChange(e) {
        setdata({ ...data, [e.target.id]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        try {
            const res = await axios.post(`${apiUrl}/post`, data);
            console.log("hi", res);
            console.log(res.data);
            route("/show");
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    useEffect(() => {
        getuser();
    }, []);

    return (
        <>

            <div className="container mt-5">
                <h2>Create a New Post.</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mt-3">
                        <label htmlFor="userid" className="form-label">Userid</label>
                        <select id="userid" className="form-control" onChange={handleChange}>
                            {user.map((val) =>
                                <option value={val._id}>{val.name}</option>)}
                        </select>
                    </div>
                    <div className="mt-3">
                        <input type="radio" id="uploadtype" className="mx-2" name="uploadtype" value="image" onChange={handleChange}  />
                        <label htmlFor="image">IMAGE</label>

                        <input type="radio" className="mx-2" id="uploadtype" name="uploadtype" value="video" onChange={handleChange}   />
                        <label htmlFor="video">VIDEO</label>
                        
                   
                    <input type="text" className="form-control mt-2" id="upload" onChange={handleChange} value={data.upload} />
                    
                    </div>

                    <div className="mt-3">
                        <label htmlFor="content" className="form-label"> Content</label>
                        <input type="text" className="form-control" id="content" placeholder="Write here..." onChange={handleChange} value={data.content} /></div>
                    <button className="btn btn-primary mt-3">Post</button>
                </form>
            </div>
        </>
    )
}