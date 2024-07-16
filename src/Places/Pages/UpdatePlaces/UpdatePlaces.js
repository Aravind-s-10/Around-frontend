import React,{useState, useEffect, useContext} from "react"
import { useParams, useHistory } from "react-router-dom"

import "./UpdatePlaces.css"
import LoadingSpinner from "../../../Shared/component/UIElements/LoadingSpinner/LoadingSpinner"
import ErrorModal from "../../../Shared/component/UIElements/ErrorModal/ErrorModal"
import Input from "../../../Shared/component/FormElements/Input/Input"
import Button from "../../../Shared/component/FormElements/Button/Button"
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../../Shared/Util/Validator"
import { useForm } from "../../../Shared/Hooks/formHook"
import { useHttpRequest } from "../../../Shared/Hooks/HttpHook"
import { authContext } from "../../../Shared/Context/auth-context"



const UpdatePlaces = props =>{

  const auth = useContext(authContext)
  const {isLoading, error, sendRequest, errorHandler} = useHttpRequest();  
  const [identifiedPlace, setIdentifiedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory()
  const [formState, textHandler,setFormData] = useForm({    //why we are doing like this is in future we will use API so that time it will take sometime to load to find the ontent in api so it might say couldn't find the place
    title:{                                     //And one more we cannot use hooks under .then method so we have to set the formdata like this by intialisig the empty one first to show loadin then the hooks will be called and data will be fetched so it can solve the time
        value:"", 
        isValid: false
    },
    description:{
        value:"", 
        isValid: false    //here we have given only two if we add more inputs this automatically assign them as false for example we have third inputs address for that here it will automatically takes val as empty and isvalid as false.
    },
}, false)

useEffect(() => {
  const findingPlace = async() =>{  //first async functio will work not work completely so while execution reacr will excuete this slowly and execute rest first once after it's execuetion completion it will execuete the bewlo code again
 try{
  const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
  setIdentifiedPlace(responseData.place);
    setFormData({title:{                              //And one more we cannot use hooks under .then method so we have to set the formdata like this by intialisig the empty one first to show loadin then the hooks will be called and data will be fetched so it can solve the time
    value: responseData.place.title, 
    isValid: true                                       //why used useEffect here is this will use useForm and produve inifnite number of state when this component rerender because its open inside compontn so we used inside the useEffect
  },
  description:{
    value: responseData.place.Description, 
    isValid: true  //here we have given only two if we add more inputs this automatically assign them as false for example we have third inputs address for that here it will automatically takes val as empty and isvalid as false.
  },
  }, true)
 }catch(error){
    console.log(error)
 }
}  
findingPlace();    
},[sendRequest, placeId,setFormData])


// its also like map menthod find will assign each value of dummy and check the id with placeid whatever is true that will be assigned to identifiedplace variable

  const formSubmitHandler = async event =>{   
    event.preventDefault();
    try{
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, 'PATCH', JSON.stringify({   
        title: formState.inputs.title.value,
        Description : formState.inputs.description.value
      }), {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + auth.token })
      history.push('/' + auth.userId + '/places')
    }catch(error){
      console.log(error);
    }
    
    
  }

  if(isLoading){
    return(
      <div className="center"><LoadingSpinner asOverlay/></div>
    )
  }
  if(!identifiedPlace && !error){
    return(
      <div><h2 className="center">Couldn't find the Place.</h2></div>
    )
  }

  return(
    <React.Fragment>
    <ErrorModal error={error} onClear={errorHandler}/> 
    {!isLoading && identifiedPlace && <form className="place-form" onSubmit={formSubmitHandler}>
            <Input element="input" type="text" id="title" label="Title" errorText="Enter the correct Title" validators={[VALIDATOR_REQUIRE()]} initialvalue={formState.inputs.title.value} onInput ={textHandler} initialvalid={true}/> 
            <Input element="description" id="description" label="Description" errorText="Enter the correct Description(Atleast enter 5 character)" validators={[VALIDATOR_MINLENGTH(5)]} onInput ={textHandler} initialvalue={formState.inputs.description.value} initialvalid={true}/>    
            <Button type="submit" disabled={!formState.isValid}>Update the Place</Button>
    </form>}
    </React.Fragment>
  )
}


export default UpdatePlaces