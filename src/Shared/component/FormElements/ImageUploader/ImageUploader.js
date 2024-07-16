import react,{useRef, useState, useEffect} from 'react'

import Button from '../Button/Button'
import './ImageUploader.css'


const ImageUploader = props => {

    const [file, setFile] = useState();
    const [previewURL, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

const imagePick = useRef();    //here we use this just for providing ref between one element to other using we can make a click as well find it in a function pickUpHandler

useEffect(() => {
    if(!file){
        return;
    }
    const fileRead = new FileReader();  //fileReader is browser side js proving API or constructor 
    fileRead.onload = () => {
        setPreviewUrl(fileRead.result);
    }
    fileRead.readAsDataURL(file);  //we send our file with method called readasdatarul it will convert our file to URL but it won't return becasue it is not a call function or send promise so we wrote above onload once it happens that function will be called automatically so usig that we set our preview URL which is inside fileread.result object which was send by data url method 
},[file]);

const pickedImageHandler = event =>{
    let pickedFile;
    let fileIsValid;
    if(event.target.files && event.target.files.length === 1 ){
        pickedFile = event.target.files[0];
        setFile(pickedFile);
        setIsValid(true);
        fileIsValid = true;
    }else{
        setIsValid(false);
        fileIsValid = false;
    }
   props.onInput(props.id, pickedFile, fileIsValid);   //it will call the formhook (our custom hook)

}

const pickUpHandler = () =>{ 
imagePick.current.click();
}

return(
    <div className='form-control'>
        <input type='file' style={{ display: 'none' }}accept='.jpg,.png,.jpeg' id={props.id} ref={imagePick} onChange={pickedImageHandler}/>
        <div className={`image-upload ${props.center && 'center'}`}>
            <div className='image-upload__preview'>
            {previewURL &&<img src={previewURL} alt='preview'/>}   
            {!previewURL && <p>Please Pick an Image</p>}
            </div>
            
        </div>
        <Button type="button" onClick={pickUpHandler}>Pick Image</Button>
    </div>
)
}

export default ImageUploader