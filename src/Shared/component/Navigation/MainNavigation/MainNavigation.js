import React from "react"
import {Link} from "react-router-dom"
import { useState } from "react"

import "./MainNavigation.css"
import "../MainHeader/MainHeader"
import MainHeader from "../MainHeader/MainHeader"
import NavLinks from "../NavLinks/NavLinks"
import SideDrawer from "../SideDrawer/SideDrawer"
import BackDrop from "../../UIElements/BackDrop/BackDrop"

const MainNavigation = props =>{

const [drawerIsOpen,setDrawerIsOpen] = useState(false);
const openDrawerHandler = () =>{
    setDrawerIsOpen(true);
}
const closeDrawerHandler = () =>{
    setDrawerIsOpen(false);
}
    return(
        <React.Fragment>     {/*<React.Fragment> is a special thing provide by react to overcome js limitation of returning one value which is we have to enclose everything inside on div but when we don't need div or span we can use this which will act as a element but at frontend it is nothing */}
         {drawerIsOpen && <BackDrop onClick={closeDrawerHandler}/>}
         <SideDrawer show={drawerIsOpen}>
            <nav className="main-navigation__drawer-nav">
            <NavLinks onClick={closeDrawerHandler}/>
            </nav>
         </SideDrawer>
        <MainHeader>
               <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                <span/>
                <span/>
                <span/>
               </button>
               <Link to="/">
               <h1 className="main-navigation__title">Around</h1>
               </Link>
               <nav className="main-navigation__header-nav">
                   <NavLinks/>
               </nav>
        </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation;