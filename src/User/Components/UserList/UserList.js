import React from "react"

import "./UserList.css"
import UserItem from "../UserItem/UserItem"
import Card from "../../../Shared/component/UIElements/Card/Card"

const UserList = (props) =>{
    if (props.items.length === 0){
        return(
            <div class="center">
                <Card>
                <h2>No Users</h2>
                </Card>
                </div>
        )
    }
    //else is no need we can directly use return use return only when u have render jsx code
    return(
        <ul className="users-list">
        {props.items.map((user) =>{
            return(<UserItem key={user.id} id={user.id} name={user.name} images={user.image} places={user.places}/>)
        })}
        </ul>
    )
}

export default UserList;