import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Update() {
    let [edit, setedit] = useState([]);
    let route = useNavigate();

    function handleChange(e) {
        setedit({ ...edit, [e.target.id]: e.target.value })
    }
 async function handleSubmit(e) {
        e.preventDefault();
        console.log(edit);
        let id = localStorage.getItem("id")
        delete edit._id;
        let res = await axios.put(`http://localhost:3005/users/${id}`, edit)
        console.log(res.data)
        route("/list")

    }
   
    useEffect(() => {
        const id = localStorage.getItem("id")
        console.log(id)
        async function getcollege() {
            let res = await axios.get(`http://localhost:3005/users/${id}`)
            console.log(res.data)
            setedit(res.data)
        }
        getcollege()

    }, [])
    


    return (
        <>
            <div className="container mt-5">
                <h2>Reset Your Acoount</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor="name" className="form-label" >Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your Name" onChange={handleChange} value={edit?.name!==undefined?edit.name:""} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="phone" className="form-label" >Phone</label>
                        <input type="phone" className="form-control" id="phone" placeholder="Enter your Phone" onChange={handleChange} value={ edit?.phone !==undefined?edit.phone:""} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email" className="form-label" >Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={handleChange} value={edit?.email!==undefined? edit.email:""} />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password" className="form-label" >Password</label>
                        <input type="text" className="form-control" id="password" placeholder="Enter your Password" onChange={handleChange} value={edit?.password!==undefined? edit.password:""} />
                    </div>
                    <button className="btn btn-primary mt-3">Submit</button>

                </form>
            </div>
        </>
    )

}