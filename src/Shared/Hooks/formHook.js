import {useReducer, useCallback} from "react"


const formReducer = (state,action) =>{
    switch(action.type){
     case "INPUT_CHANGE" :
     let formIsValid = true; 
     for (const inputId in state.inputs){
        if(!state.inputs[inputId]){
            continue;
        }
         if (inputId === action.inputId){
            formIsValid = formIsValid && action.isValid   //1 true  2 false 
         }else{
            formIsValid = formIsValid && state.inputs[inputId].isValid   //don't use return for if condition inside for loop otherwise it will exit loop immediately
         }
     }
     return {...state,
         inputs:{
             ...state.inputs,
             [action.inputId]:{value: action.val, isValid: action.isValid}}, isValid: formIsValid}
             case "SET_DATA":
                return{
                    inputs:action.val,
                    isValid:action.isValid
                }
         default : return state;
 }
 
 
 }

export const useForm = (initialState, initialFormValidity) =>{

const [formState, dispatch] = useReducer(formReducer,{
        inputs:initialState,
        isValid: initialFormValidity   //overall form validity 
    }
    );
    const textHandler = useCallback((id,value,isValid) =>{    //we have used useCallback hook here because when the component rerender(i.e while state updation) the function will get created again and the old value which return by the function won't be there so by using this hook we can stop 
        dispatch ({type: "INPUT_CHANGE", inputId: id, val: value, isValid: isValid})  //[] if the dependency array is empty the function will be created once if is it filled with some properties then it will recreate when the dependency change
    },[]);

    const setFormData = useCallback((inputData,formValidity) =>{
           dispatch({type: "SET_DATA", val:inputData, isValid:formValidity})
    },[])

    return [formState,textHandler,setFormData];  //why we're returning the functional here is it won't render like component in the place where we're calling this hook will just process the function here itself thats why we're return the function aswell
}