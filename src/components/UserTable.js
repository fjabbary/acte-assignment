import React from 'react'

function UserTable({ userList, handleDelete, handleEdit }) {


    return (
        <div className='mt-5'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((item, index) => <tr key={item.id}>
                        <td><strong>{index + 1}</strong></td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.email} </td>

                        <td>
                            <button onClick={() => handleDelete(item.id)} className="btn btn-danger me-1">Delete</button>

                            <button onClick={() => { handleEdit(item.id); }} className="btn btn-info">Edit</button>
                        </td>
                    </tr>)}

                </tbody>
            </table>
        </div>
    )
}

export default UserTable