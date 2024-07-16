import React,{useContext} from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Input from "../../../Shared/component/FormElements/Input/Input"
import "./Places.css"
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from "../../../Shared/Util/Validator"
import Button from "../../../Shared/component/FormElements/Button/Button"
import { useForm } from "../../../Shared/Hooks/formHook"
import { useHttpRequest } from "../../../Shared/Hooks/HttpHook"
import LoadingSpinner from "../../../Shared/component/UIElements/LoadingSpinner/LoadingSpinner"
import ErrorModal from "../../../Shared/component/UIElements/ErrorModal/ErrorModal"
import { authContext } from "../../../Shared/Context/auth-context"
import ImageUploader from "../../../Shared/component/FormElements/ImageUploader/ImageUploader"



const Places = () =>{

    const auth = useContext(authContext)

const history = useHistory();
const {isLoading, error, sendRequest, errorHandler} = useHttpRequest();    
const [formState, textHandler] = useForm({
    title:{
        value:"", 
        isValid: false
    },
    description:{
        value:"", 
        isValid: false    //here we have given only two if we add more inputs this automatically assign them as false for example we have third inputs address for that here it will automatically takes val as empty and isvalid as false.
    },
    address:{
        value:"", 
        isValid: false    //here we have given only two if we add more inputs this automatically assign them as false for example we have third inputs address for that here it will automatically takes val as empty and isvalid as false.
    },
    image: {
        value: null, 
        isValid: false    //here we have given only two if we add more inputs this automatically assign them as false for example we have third inputs address for that here it will automatically takes val as empty and isvalid as false.
    }
}, false)



    const formSubmitHandler = async event =>{
        
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', formState.inputs.title.value)
        formData.append('Description', formState.inputs.description.value)
        formData.append('address', formState.inputs.address.value)
        formData.append('image', formState.inputs.image.value)
        formData.append('creator', auth.userId)

        try{
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/`,'POST', formData, {'Authorization' : 'Bearer ' + auth.token})
          history.push('/')             //once we added the place we are pushing the user to / page which is main all user page this is happening by hooks provided by react router dom called useHistory which provided an object saving them in history and that provided some method slike push replace so using push we are pushing users to particular page
        }catch(error){
            
        }
        
    }

    return(
            <React.Fragment>
            
            {!isLoading && error && <ErrorModal error={error} onClear={errorHandler}/>}
            <form className="place-form" onSubmit = {formSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay/>}
            <Input element="input" type="text" id="title" label="Title" errorText="Enter the correct Title" validators={[VALIDATOR_REQUIRE()]} onInput={textHandler}/> 
            <Input element="description" id="description" label="Description" errorText="Enter the correct Description(Atleast enter 5 character)" validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} onInput={textHandler}/>  
            <Input element="input" id="address" label="Address" errorText="Enter the correct address" validators={[VALIDATOR_REQUIRE()]} onInput={textHandler}/> 
            <ImageUploader id="image" onInput={textHandler}/>  
            <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
            </form>
            </React.Fragment>

    )
}

export default Places;


// validators={[VALIDATOR_REQUIRE()]} this mean we are sending the array which holds function from someother component as props the function which will send the value what it has 

//this functionality sucks man 
//when title is getting updated for loop will run first it will check title with title so first condition is on which will return true and form will also be true no next iteration which is else condition which will obviosly false because
//so form is invalid but state is updated by returning no title is valid in state so now description is chnaged first loop with title unequal condition so else condition here form valid is true and title is also tru so first condition tru now second iteration so condition true obviously first ine is tru so both true no form isvalid 
//here important is we have reuse formIsValid value if first iteration formIsValid became true we have use the same in next iteration