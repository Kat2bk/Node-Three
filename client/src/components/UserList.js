import React, { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users')
        .then(response => {
            console.log(response.data)
            setUsers(response.data)
        })
        .catch(error => {
            console.log('Cannot get users', error)
        })
    }, [])

    return (
        <div className="user-list">
            {users.map(user => {
                <UserCard 
                key={user.id}
                id={user.id}
                name={user.name}
                />
            })}
        </div>
    )
}

export default UserList;