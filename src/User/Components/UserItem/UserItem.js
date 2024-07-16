import React from "react"
import "./UserItem.css"
import {Link} from "react-router-dom"
import Card from "../../../Shared/component/UIElements/Card/Card"
import Avatar from "../../../Shared/component/UIElements/Avatar/Avatar"

const UserItem = (props) =>{
    return(
        <li className="user-item">
        <Card className="user-item__content">
            <Link to={`/${props.id}/places`}>
                    <div className="user-item__image">
                        <Avatar image={props.images} alt={props.name}/>
                    </div>
                    <div className="user-item__info">
                        <h2>{props.name}</h2>
                        <h3>{props.places.length} {props.places === 1 ? "place" :"places"}</h3>
                    </div>
            </Link>
            </Card>
        </li>
    )
}

export default UserItem;