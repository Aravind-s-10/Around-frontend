import React,{useState,useContext} from "react"

import "./Auth.css"
import Input from "../../../Shared/component/FormElements/Input/Input"
import Button from "../../../Shared/component/FormElements/Button/Button"
import {VALIDATOR_EMAIL,VALIDATOR_MINLENGTH,VALIDATOR_REQUIRE} from "../../../Shared/Util/Validator"
import { useForm } from "../../../Shared/Hooks/formHook"
import { useHttpRequest } from "../../../Shared/Hooks/HttpHook"
import Card from "../../../Shared/component/UIElements/Card/Card"
import { authContext } from "../../../Shared/Context/auth-context"
import LoadingSpinner from "../../../Shared/component/UIElements/LoadingSpinner/LoadingSpinner"
import ErrorModal from "../../../Shared/component/UIElements/ErrorModal/ErrorModal"
import ImageUploader from "../../../Shared/component/FormElements/ImageUploader/ImageUploader"

const Auth = props =>{



const auth = useContext(authContext);

const [isLoginMode,setIsLoginMode] = useState(true);

const {isLoading, error, sendRequest, errorHandler} = useHttpRequest();  //destructuring our value here don't get confused why we are using object here and next one as array we can get this in any data types

const[authFormNewState,inputHandler,setFormData]= useForm({   //here you can use anyname for val like value and isValid use can use any not exactly like what we have in hook but hook will take it correctly the same applicable for function name(inputHanldler) and stateName(authFormState)
    Email:{
        value:"",
        isValid: false
    },
    password: {
        value:"",
        isValid: false
    }
},false)

    const authSubmitHandler = async event =>{   //this is going to asynchronou task because of fwtching
        event.preventDefault(); 
        
        if(isLoginMode){
            try{
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/login`, 'POST', JSON.stringify({   
                    email: authFormNewState.inputs.Email.value,
                    password : authFormNewState.inputs.password.value
                  }), {'Content-Type': 'application/json'})
                  
                auth.logIn(responseData.userId, responseData.token); //if we don't have any error it will login if we have it will be taken to catch since we don't have wny use with this error we are not doing anything there
            }catch(error){  

            }
             
        }else{
            try{  

                
                const formData = new FormData();   //here we used FormData api which provided browser side js fortunately this will help us to send both the string value and binary value as to backend by setting proper mime type and content-type one more benefit if u use this headers or not required
                formData.append('email', authFormNewState.inputs.Email.value)
                formData.append('name', authFormNewState.inputs.Name.value)
                formData.append('password', authFormNewState.inputs.password.value)
                formData.append('image', authFormNewState.inputs.image.value)
                
                  //here in this function we are setting the state multiple tile inside same function since it is a async fcuntion reacts unders it properly it will set it quicly so the next set will also happens Quickly
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, 'POST', formData)          
              //const responseData = await sendRequest('http://localhost:3001/api/users/signup', 'POST', JSON.stringify({email: authFormNewState.inputs.Email.value, name: authFormNewState.inputs.Name.value, password: authFormNewState.inputs.password.value}), {'Content-Type' : 'application/json'})         //telling this is post method //fetch doesn't mean only send get request it will also post at that time you have to metion it specifically
                       //letting our backend know we are sending json otherwise it doesn't have any idea                     
                       //here we have this JSON object and that object has stringfy method which will convert the data given inside this to JSON our backend expecest the json and it parse it too
                       // you cannot simply send HTTP Request to server whcih requires to set headers find in backedn app.js file
                
                     //json is a method in out response from fetch appi we have all response and fetch will provide some method to parse it here we have json() which will parse the json and provide js objects
                auth.logIn(responseData.userId, responseData.token);
            }catch(error){
              
            }
            
        }

    }

   const switchModeHandler = () =>{
    if(!isLoginMode){
      setFormData(
        {...authFormNewState.inputs, 
            Name : undefined,
            image : undefined
        },authFormNewState.inputs.Email.isValid && authFormNewState.inputs.password.isValid
      )
    }else{
        setFormData(
            {...authFormNewState.inputs, 
                Name : {
                    value:"",
                    isValid: false
                },image : {
                    value : null,
                    isValid : false,
                }
            },false
          )
      }
    setIsLoginMode(prevMode => !prevMode)    //here it will take the prevoisLoginMode and set the to the opposite 
   }


return(
    <React.Fragment>
    <ErrorModal error={error} onClear={errorHandler}/>  {/* it will come only when the error is there otherwise it won't you can see in errorModal component show is set to !!props.error which means if error is tru then show otherwise no*/}
    <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login required</h2>
        <hr/>
    <form className="" onSubmit={authSubmitHandler}>
        {!isLoginMode && <Input element="input" type="text" id="Name" placeholder="Your Name" errorText ="Please enter your name" label="Name" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler}/>}
        {!isLoginMode && <ImageUploader id="image" center onInput={inputHandler}/>}
       <Input element="input" type="text" id="Email" placeholder="E-mail" errorText ="Please enter a valid email address" label="Email" validators={[VALIDATOR_EMAIL(),VALIDATOR_REQUIRE()]} onInput={inputHandler}/>
       <Input element="input" type="text" id="password" placeholder="Password" errorText ="Please enter a correct password" label="password" validators={[VALIDATOR_MINLENGTH(8),VALIDATOR_REQUIRE()]} onInput={inputHandler}/>
       <Button type="submit" disabled={!authFormNewState.isValid}>{isLoginMode ? "Login" : "Sign Up"}</Button>
    </form>
    <Button inverse onClick={switchModeHandler}>Switch to {isLoginMode ? "Sign Up" : "Login"}</Button>
    </Card>
    </React.Fragment>
)
}

export default Auth;