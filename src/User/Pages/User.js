import React,{useEffect, useState} from "react"

import UserList from "../Components/UserList/UserList";
import ErrorModal from "../../Shared/component/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../Shared/component/UIElements/LoadingSpinner/LoadingSpinner";
import { useHttpRequest } from "../../Shared/Hooks/HttpHook";

const User = () =>{
const {isLoading, error, sendRequest, errorHandler} = useHttpRequest();
const[loadedUsers, setLoadedUsers] = useState();

useEffect(() => {     
    const loadingUser = async () =>{  //we can give async above aswell () => here but it is not a good of writing code so we have given like this
        try{
          const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/`);  //if you wanna parse json or convert to json you can use menthod JSON.stringfy and JSON.parse() and put the var or object to convert them ut fetch api provide a special method to convert reponse json to object which reponse.json()
          setLoadedUsers(responseData.Users);
        }catch(error){
        }
        }
        loadingUser();  //as explained in line 13 i'll call the function here itself so it return value here itself //do not use return inside the useEffect which will cleanup the last value fo this function performed
}, [sendRequest]);
   

    return (   
        <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler}/>
        {isLoading && <LoadingSpinner asOverlay/>}
        {!isLoading && loadedUsers && <UserList items={loadedUsers} />}  {/* userlist will not load if value of loadedusers is empty it will throw an error thatswhy we have given if logic if false it will show nothing */}
        </React.Fragment>
    )
}

export default User;