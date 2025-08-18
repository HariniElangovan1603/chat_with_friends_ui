import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function List() {
    let [college, setcollege] = useState([]);
    let route = useNavigate()

    async function getcollege() {
        let res = await axios.get('http://localhost:3005/users')
        setcollege(res.data)
        console.log(res.data)
    }
    useEffect(() => {
        let user = localStorage.getItem("user")
        if(user){
            getcollege()
        }
    }, [])

    async function handleDelete(id) {
        let res = await axios.delete(`http://localhost:3005/users/${id}`)
      console.log(res.data)
        getcollege();

    }
    function handleUpdate(id) {
        localStorage.setItem("id", id)
        route("/update")
    }

    return (
        <>
            <div className='container mt-5'>
                <h2>Users List</h2>
                <table className=' table table-striped mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {college.map((val) =>
                            <tr key={val._id}>
                                <td>{val.name}</td>
                                <td>{val.phone}</td>
                                <td>{val.email}</td>
                                <td>{val.password}</td>
                                <td>
                                    <button className='btn btn-danger ' onClick={() => handleDelete(val._id)}>Delete</button>
                                    <button className='btn btn-primary' onClick={() => handleUpdate(val._id)}>Update</button>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )

}