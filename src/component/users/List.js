
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './List.css';
import apiUrl from '../../apiConfig';

export default function List() {
    let [college, setcollege] = useState([]);
    let route = useNavigate()

    async function getcollege() {
        try {
            let res = await axios.get(`${apiUrl}/users`);
            setcollege(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) {
            getcollege();
        }
    }, []);

    async function handleDelete(id) {
        try {
            let res = await axios.delete(`${apiUrl}/users/${id}`);
            console.log(res.data);
            getcollege();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
    function handleUpdate(id) {
        localStorage.setItem("id", id)
        route("/update")
    }

    return (
        <>
            <div className='container mt-5 table-responsive h-auto '>
                <h2 className='text-center'>Users List</h2>
                <table className=' table table-striped table-dark mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {college.map((val) =>
                            <tr key={val.name}>
                                <td> <p>{val.name}</p></td>
                                <td><p>{val.phone}</p></td>
                                <td><p>{val.email}</p></td>
                                <td className='d-flex'><button className='btn btn-danger' onClick={() => handleDelete(val._id)}><i class="fa-solid fa-trash"></i></button>
                                    <button className='btn btn-primary' onClick={() => handleUpdate(val._id)}>
                                   <i class="fa-solid fa-pen"></i></button>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )

}