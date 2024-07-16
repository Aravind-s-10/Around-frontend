import React,{useContext} from "react"
import {NavLink} from "react-router-dom"   //NavLink is different from Linkin react-router-dom if we use that it will highlight that anchor tag text by adding class active unlink link tag which is just a tag

import "./NavLinks.css"
import { authContext } from "../../../Context/auth-context"

const NavLinks = props =>{

    const auth = useContext(authContext);

    const logOutHandler = () =>{
        auth.logOut();
    }
    
    return(
        <ul className="nav-links">
            <li><NavLink onClick={props.onClick} to="/" exact>All Users</NavLink></li>
            {auth.isLoggedIn && <li><NavLink onClick={props.onClick}to={`/${auth.userId}/places`}>My Places</NavLink></li>}
            {auth.isLoggedIn && <li><NavLink onClick={props.onClick} to="/places/new">ADD Place</NavLink></li>}
            {!auth.isLoggedIn &&<li><NavLink onClick={props.onClick} to="/auth">Authenticate</NavLink></li>}
            {auth.isLoggedIn && <li><NavLink onClick={logOutHandler} to="/auth">Log Out</NavLink></li>}
        </ul>
    )
}

export default NavLinks;