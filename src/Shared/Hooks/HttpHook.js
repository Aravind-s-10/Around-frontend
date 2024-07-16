import {useState,useEffect,useRef,useCallback} from 'react'

export const useHttpRequest = () => {

const [isLoading, setIsLoading] = useState(false);
const [error,setError] = useState();

const activeHttpRequest = useRef([]);

const sendRequest = useCallback(async (url , method = 'GET', body = null, headers ={}) => {
    
    setIsLoading(true);
    const handleAbortController = new AbortController();  //whenever our sendrequest is called new abortcontroller(built in api used to control fetch menthod) instances is created and store in out handlecontoller var
    activeHttpRequest.current.push(handleAbortController);  //then we are pushing that in activehttprequest which will hav all the instance
         try{
             const response = await fetch(url, {
                method : method,               //=> with JS hel you can give just method if property and value both are same
                body : body,
                headers: headers,
                signal: handleAbortController.signal    //here we are controlling our fetch using the signal from abortcontrller
             })
             const responseData = await response.json();

             if(!response.ok){
                 throw new Error(responseData.message)
             }
            setIsLoading(false);
            return responseData;
         }catch(error){
            setIsLoading(false);
            setError(error.message)
            throw error;   //here we throw the error it will catched by the catch block in the place we use this hook
         }
         
   },[]);
   const errorHandler = () =>{
    setError(null);
   }

   useEffect(() => {
        return (() => {  //this cleanup will abort got thru all instance we saved in activehttprequest and abort them which will send a abort signal to that particular signal and abort the fetch
            activeHttpRequest.current.forEach(abortCtrl => abortCtrl.abort('Fetch request cancelled by user')); //the abort message is important it will throw error   //returning a function inside useEffect is called as cleanup function which will be helpful to run when a component is unmounted(which means when a component is removed from dom) when you run a fetch option which like add data and posting to backend before that process happens if you move to other page it will throw fetch error so at that time we can use a AbortController() which like a constructor which provide some object which helps us to abort the fetch operation 
            //react determines this unmounted and with a speciality of useEffect we can abort thr fetch with a signal  property
        })
   },[]);

   return ({isLoading: isLoading, error: error, sendRequest, errorHandler}) //here we can use array but we'll have multiple data types like object value of sendrequest everything so object is best
}

