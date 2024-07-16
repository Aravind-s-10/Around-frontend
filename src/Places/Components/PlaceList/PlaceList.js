import React from "react"

import "./PlaceList.css"
import Card from "../../../Shared/component/UIElements/Card/Card"
import PlaceItem from "../PlaceItem/PlaceItem"
import Button from "../../../Shared/component/FormElements/Button/Button"

const PlaceList =  props =>{
if (props.items.length === 0){
    return(
<div className="place-list center">
   <Card>
    <h2>No Places found, Create one?</h2>
    <Button to="/places/new">Share Place!</Button>
    </Card>
    </div>)
}

return(
<ul className="place-list">
    {props.items.map((item)=> {
       return(
           <PlaceItem 
           key={item.id} 
           id={item.id}
           title={item.title} 
           description={item.Description}
           image={item.image} 
            address={item.address} 
            coordinates={item.location} 
            creatorId={item.creator}
            onDelete = {props.onDelete}/>
       )
    })}

</ul>
)
}

export default PlaceList;