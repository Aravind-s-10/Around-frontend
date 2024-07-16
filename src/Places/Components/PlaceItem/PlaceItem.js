import React,{useState,useContext} from "react"

import "./PlaceItem.css"
import ErrorModal from "../../../Shared/component/UIElements/ErrorModal/ErrorModal"
import LoadingSpinner from "../../../Shared/component/UIElements/LoadingSpinner/LoadingSpinner"
import Card from "../../../Shared/component/UIElements/Card/Card"
import Button from "../../../Shared/component/FormElements/Button/Button"
import Modal from "../../../Shared/component/UIElements/Modal/Modal"
import { authContext } from "../../../Shared/Context/auth-context"
import { useHttpRequest } from "../../../Shared/Hooks/HttpHook"


const PlaceItem = props =>{

const auth = useContext(authContext);

const [showModal,setShowModal] = useState(false);
const [showDeleteModal,setShowDeleteModal] =useState(false);
const {isLoading, error, sendRequest, errorHandler} = useHttpRequest();

const openModalHandler = () => setShowModal(true);

const closeModalHandler = () => setShowModal(false);

const openDeleteModalHandler = () => setShowDeleteModal(true)

const closeDeleteModalHandler = () => setShowDeleteModal(false);

const confirmDeleteHandler = async () => {
    setShowDeleteModal(false);
    try{
        await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`, 'DELETE',null, {'Authorization' : 'Bearer ' + auth.token})
        props.onDelete(props.id);
    }catch(error){
          
    }
    
}

    return(
        <React.Fragment>
        <li className="place-item">
            <Card className="place-item__content">
            {isLoading && <LoadingSpinner asOverlay/>}
            <div className="place-item__image">
                <img src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.title}/>
            </div>
            <div className="place-item__info">
                <h2>{props.title}</h2>
                <h3>{props.address}</h3>
                <p>{props.description}</p>
            </div>
            <div className="place-item__actions">
                <Button inverse onClick = {openModalHandler}>VIEW ON MAP</Button>
                {auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button>}
                {auth.userId === props.creatorId && <Button danger onClick={openDeleteModalHandler}>DELETE</Button>}
            </div>
            </Card>
        </li>
        <ErrorModal error={error} onClear={errorHandler}/>
        <Modal show={showDeleteModal}
        onCancel={closeDeleteModalHandler} 
        header="Are you Sure?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions" 
        footer={<React.Fragment><Button inverse onClick={closeDeleteModalHandler}>Cancel</Button><Button danger onClick={confirmDeleteHandler}>Delete</Button></React.Fragment>}>Do you want to proceed deleting this place? Please note that it can't be undone thereafter.</Modal>
        <Modal show={showModal} onCancel={closeModalHandler} header={props.title} contentClass="place-item__modal-content" footerClass="place-item__modal-actions" footer={<Button onClick={closeModalHandler}>Close</Button>}>
        <div className="map-container">
        <iframe title="map" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src={'https://maps.google.com/maps?q=' + props.coordinates.lat.toString() + ',' + props.coordinates.lng.toString() + '&t=&z=15&ie=UTF8&iwloc=&output=embed'}></iframe>
        <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=5a33be79e53caf0a07dfec499abf84b7b481f165'></script>
        </div>
        </Modal>
        </React.Fragment>
    )
}

export default PlaceItem;