import { createContext } from "react";

export const authContext = createContext({isLoggedIn: false,token: '', userId:'', logIn: () =>{},logOut : () => {}});  //here we gave just default value log in and log out is a empty function now we can use this function as a component using provider in app.js there we update value for this so initally we are setting logginmode as false when we use this auth context anyehre in our component and use the fucntion this will update the value and context will get updated mostly chnaging willhappen in app.js file because that handels the route and so based on the context routes will rerender based on if else