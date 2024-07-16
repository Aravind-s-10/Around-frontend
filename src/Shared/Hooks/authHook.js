import React,{useCallback, useState, useEffect} from 'react'

export const useAuth = () =>{
const[token,setToken] = useState();
const [tokenExpirationDate, setTokenExpirationDate] = useState();
const[userId, setUserId] = useState();



const logIn = useCallback((userId, token, expirationDate) =>{
  setToken(token);
  setUserId(userId);
  const storedExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60) //new Date API will provide the the current date .getTime() will provide the time stapm in millisceond from jan 1 1970 //that is when unix developed so from taht time
  setTokenExpirationDate(storedExpirationDate); //see this is in state to use it
  localStorage.setItem('userData',JSON.stringify({userId : userId, token: token, expirationDate: storedExpirationDate.toISOString()})) //locaStorage is a global JS object or API we can set this eith key and value //whenever we reload the page we are starting our react application entirely but the token we created while login will expire in 1 hpur so which pointless so we use localstorage to utilixe the token and keep the user stay login even if we reload until the token gets expired
 //in local storage only can save text or string or a thing which can converted to text like numbers no other things like arry onjects and all so we convert the objec to json json is nothing which is object format text so we can there
},[])

const logOut = useCallback(() =>{
  setToken(null);
  setUserId(null);
  setTokenExpirationDate(null);
  localStorage.removeItem('userData'); //whenever we logout the created token must be removed so we are removing the same here
},[])

useEffect(() =>{     //here we have used useEffect becuse login function would have been called again n again which will from infinite loop so only and useEffect will run atlast only but when react process the code it will read from first and register all the hooks and theire dependency so login must intialised after the processing then component will rendered then useEffect will run
  const storedData = JSON.parse(localStorage.getItem('userData'))  //this will check if we have token or not if we have even even if reload and component rernders check for token if exist it will log in if we don't then it won't
  if (storedData && storedData.token && new Date(storedData.expirationDate) > new Date()){  //if current date is higher than the expiration date it will login stay login otherwise it won't 
    logIn(storedData.userId, storedData.token, new Date(storedData.expirationDate)); //when we log in there will be change in function so this will render here once again when we reload page everythinng will render atlast this effect will render this has called the login func last so there will be a chnage in function so it will execuete again and sty login so this how everytime it log in whenever we load
  }
},[logIn])  //this useEffect will run only when react relises that there diff in the function from the last render then only it will load otherwise it won't

useEffect(() => {
  let logOutTimer;
  if (token && tokenExpirationDate){
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime(); 
    logOutTimer = setTimeout(logOut, remainingTime);  //setTimeout will execute function in particular time we calculate that time by sub the current time with exp time
  }
//timeOut will return id that will stored in logOutTimer
  return () => {  //we don't have token like people may have loggeout out manually so that we don't want this timeout to execute so at that time based on the logout change this will execuete no else will execute and clear the timeout
    clearTimeout(logOutTimer);
  };
}, [token, tokenExpirationDate, logOut]);  //same here whenever there is a change this thing this will render 

 return{token, logIn, logOut, userId}
}