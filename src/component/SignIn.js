
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiUrl from "../apiConfig";
export default function SignIn(){
     let [data, setdata] = useState([]);
    let route = useNavigate()

    function handleChange(e) {
        setdata({ ...data, [e.target.id]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
       let res = await axios.post(`${apiUrl}/users/signin`, data)
        console.log(res.data)
        if( res.status === 200){
            console.log("hi")
            localStorage.setItem("user",JSON.stringify(res.data.user))
            route("/list")
        }
       

    }

    return (
        <div className="container mt-5">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your Email" onChange={handleChange} value={data.email} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="passwrd" className="form-label" >Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={handleChange} value={data.password} />
                    </div>
                    <button className="btn btn-primary mt-3">SignIn</button><br/>
                    <a class="btn btn-outline- mt-3" type="button" href="/create" >Create new Account</a>

                </form>
            </div>
    )
}