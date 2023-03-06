import React, { useState, useEffect } from 'react'
import UserTable from './UserTable';
import { v4 as uuidv4 } from 'uuid';

function UserForm() {

    const [contact, setContact] = useState({ name: "", age: "", email: "", relocated: false });
    const [userList, setUserList] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null)

    const handleChange = (e) => {
        setContact({ id: uuidv4(), ...contact, [e.target.name]: e.target.value, isEditing: false })
    }

    const handleChangeCheckbox = (e) => {
        setContact({ ...contact, relocated: e.target.checked })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserList([...userList, contact]);

        setContact({ name: "", age: "", email: "", relodcated: false })
        localStorage.setItem('user-list', JSON.stringify([...userList, contact]))
    }

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('user-list')) || [];
        setUserList(items)
    }, [])

    const handleDelete = (id) => {
        const filteredArr = userList.filter(item => item.id !== id)
        localStorage.setItem('user-list', JSON.stringify(filteredArr))
        setUserList(filteredArr)
    }

    const handleEdit = (id) => {
        const foundItem = userList.find(item => item.id === id)
        const { name, age, email } = foundItem;
        setContact({ name, age, email, relodcated: false })
        setIsUpdate(true)
        setUpdateId(id)
    }

    const handleUpdate = () => {
        const newArr = Array.from(userList);
        const idx = newArr.findIndex(item => item.id === updateId)
        newArr.splice(idx, 1, contact)

        setUserList(newArr)
        localStorage.setItem('user-list', JSON.stringify(newArr))
    }


    return (
        <div className="user-form m-auto mt-5 bg-light p-5">
            <form className="bg-light p-5" >
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
            </form>
            {!isUpdate && <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>}

            {isUpdate && <button onClick={handleUpdate} className="btn btn-success">Update</button>}
            <hr />
            <UserTable userList={userList} handleDelete={handleDelete} handleEdit={handleEdit} handleUpdate={handleUpdate} />
        </div>
    )
}

export default UserForm