import React,{useReducer, useEffect} from "react"

import "./Input.css"
import {validate}  from "../../../Util/Validator"

const inputReducer = (state, action) =>{
    switch(action.type){
        case "CHANGE" : return {...state, value: action.val, isValid: validate(action.val, action.validators)}; //here also we're doing same we're pulling a function from validator file and executing that function here rfer that file
        case "TOUCH" : return {...state,isTouched: true}
        default : return state;
    }
}

const Input = props =>{

const [inputState, dispatch] = useReducer(inputReducer,{value: props.initialvalue || "", isValid: props.initialvalid || false,isTouched:false }); //look below for explanation  //we used here like this value: props.value || "", isValid: props.valid || false becuase while updating the value the existing title and description must be shown we have given value of input as inputState.value so the intial value will be rendered
const eventHandler = event =>{
 dispatch({type: "CHANGE", val: event.target.value, validators: props.validators}) ////look below for explanation
}

const touchHandler = () =>{
    dispatch({type: "TOUCH"})
}
const {id, onInput} = props;
const {value, isValid} = inputState

useEffect(() =>{                     //we have used useEffect hook here because whenever any dependency changes the function should be rendered and the value and validity must be sent we're doing this logic to check the overall validity of the from
    onInput(id,value,isValid)
},[onInput,id,value,isValid])


const element = props.element === "input" ? (
<input 
    id={props.id}
    type={props.type} 
    placeholder={props.placeholder} value={inputState.value} onBlur={touchHandler} onChange={eventHandler}/>) : 
    (<textarea
        id={props.id}
        row={props.row || 3} 
        placeholder={props.placeholder} value={inputState.value} onBlur={touchHandler} onChange={eventHandler}/>)

  return(
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && "form-control--invalid"}`}>
    <label htmlFor={props.id} >{props.label}</label>
    {element}
    {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>} {/*here first both condition true so the last one work according which is <p> tag*/}
    </div>
  )
}

export default Input;


// useState provides two things one is current state and new state here useReducer is also like that but the new state will be provide after function
//const [state,dispatch] = useReducer(functionalanyname,initialvalue); state will take the whatever the in the place of intinavalue here in dispatch will 
//- dispatch provide the paramater to the functionalanyname function like functionalanyname(parameter) so the processed value from function functionalanyname will store in dispatch
//this how we get newstate value

//why we use useReducer we'll use this when we have two state when the second state depends on the value of first state here value is one and isValid is other