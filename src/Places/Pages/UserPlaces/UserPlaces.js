import React,{useEffect, useState} from "react"
import { useParams } from "react-router-dom"

import "./UserPlaces.css"
import PlaceList from "../../Components/PlaceList/PlaceList"
import { useHttpRequest } from "../../../Shared/Hooks/HttpHook"
import LoadingSpinner from "../../../Shared/component/UIElements/LoadingSpinner/LoadingSpinner"
import ErrorModal from "../../../Shared/component/UIElements/ErrorModal/ErrorModal"

const UserPlaces = props =>{

const {isLoading, error, sendRequest, errorHandler } = useHttpRequest();
const [loadedPlaces, setLoadedPlaces] = useState();
const userId = useParams().userId;



useEffect(() =>{
    const getPlacesHandler = async() => {
        try{ 
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
            setLoadedPlaces(responseData.places);
        }catch(error){
            console.log(error);
        } 
    }
    getPlacesHandler();
},[sendRequest,userId]);


const placeDeleteHandler = (deletedPlaceId) =>{
setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
}

   return(
<React.Fragment>
<ErrorModal error={error} onClear={errorHandler}/>
{isLoading && <div className="center"><LoadingSpinner asOverlay/></div>}
{!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDelete={placeDeleteHandler}/>}
</React.Fragment>


   )
}

export default UserPlaces;


// About useparams from react-router-dom use params is function is aware of a empty variable we created in the router path section ex:/:userid/places whatever comes with
// : is that variable we can access that variable by userparams.userId like this anywhere we need it