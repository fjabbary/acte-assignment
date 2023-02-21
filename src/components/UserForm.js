import React, { useState, useEffect, useRef } from 'react'
import UserTable from './UserTable';
import { v4 as uuidv4 } from 'uuid';

function UserForm() {

    const [contact, setContact] = useState({ name: "", age: "", email: "", relocated: false });
    const [userList, setUserList] = useState([]);

    const handleChange = (e) => {
        setContact({ id: uuidv4(), ...contact, [e.target.name]: e.target.value })
    }

    const handleChangeCheckbox = (e) => {
        setContact({ ...contact, relocated: e.target.checked })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserList([...userList, contact])
        localStorage.setItem('user-list', JSON.stringify([...userList, contact]))

        setContact({ name: "", age: "", email: "", relodcated: false })
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user-list'))
        setUserList(items)
    }, [])

    const handleDelete = (id) => {
        const filteredArr = userList.filter(item => item.id !== id)
        setUserList(filteredArr)
        localStorage.setItem('user-list', JSON.stringify(filteredArr))
    }

    return (
        <div className="user-form m-auto mt-5">
            <form className="bg-light p-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} value={contact.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" id="age" name="age" onChange={handleChange} value={contact.age} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={contact.email} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="relocated" onChange={handleChangeCheckbox} name="relocated" value={contact.relocated} />
                    <label className="form-check-label" htmlFor="relocated">Relocated</label>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <UserTable userList={userList} handleDelete={handleDelete} />
        </div>
    )
}

export default UserForm