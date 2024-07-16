import React from "react"
import ReactDom from "react-dom"
import { CSSTransition } from "react-transition-group"

import "./Modal.css"
import BackDrop from "../BackDrop/BackDrop"


const ModalOverlay = props =>{
    const content = 
    <div className={`modal ${props.className}`} style={props.style}>
       <header className={`modal__header ${props.headerClass}`}>{props.header}</header>
       <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}/>
       <div className={`modal__content ${props.contentClass}`}>{props.children}</div>
       <footer className={`modal__footer ${props.footer_class}`}>{props.footer}</footer>
    </div>
    return ReactDom.createPortal(content,document.getElementById("modal-area"));
}

const Modal = props =>{
return(
    <React.Fragment>
    {props.show && <BackDrop  onClick={props.onCancel}/>}
    <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
         <ModalOverlay {...props}/> 
    </CSSTransition>
    </React.Fragment>
)
}

export default Modal;