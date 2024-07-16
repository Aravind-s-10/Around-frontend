import React from "react"
import ReactDOM from "react-dom"
import { CSSTransition } from "react-transition-group"

import "./SideDrawer.css"

const SideDrawer = props =>{
    const content = <CSSTransition in={props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit><aside className="side-drawer">{props.children}</aside></CSSTransition>   //we can store jsx in var but we can't return as usual in js
 return(
    ReactDOM.createPortal(content, document.getElementById('side-drawer-portal'))     //it is a portal concept it is used to show we can place our html element 
                                                                                      //wherever we want to here we try to place out <aside> element in body tag so we created one div with id in index.html using dom package we createportal and showed this in body tag
)
}

export default SideDrawer;



//react-transition-group package will help us on animation area in this there is a special component called CSSTransition that helps us in a place where a element need to be shown and removed by adding classes and removing it but the the respective css must added in common index.css file
//they'll accept some special attr like classNames 
//mountOnEnter unmountOnExit it is specially used to open and close the child element when in is true or false so it will listen to in attr