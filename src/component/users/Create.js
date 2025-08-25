import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import apiUrl from '../../apiConfig';

export default function Create() {
    let [data, setdata] = useState([]);
    let route = useNavigate();

    function handleChange(e) {
        setdata({ ...data, [e.target.id]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        try {
            let res = await axios.post(`${apiUrl}/users`, data);
            console.log(res.data);
            route("/list");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <h2>Create New Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor="name" className="form-label" >Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your Name" onChange={handleChange} value={data.name} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="phone" className="form-label" >Phone</label>
                        <input type="phone" className="form-control" id="phone" placeholder="Enter your Phone" onChange={handleChange} value={data.phone} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email" className="form-label" >Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your Email" onChange={handleChange} value={data.email} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="passwrd" className="form-label" >Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={handleChange} value={data.password} />
                    </div>
                    <button className="btn btn-primary mt-3">Submit</button>

                </form>
            </div>
        </>
    )

}