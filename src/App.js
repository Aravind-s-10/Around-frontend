import React,{Suspense} from "react"
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom"; 

import './App.css';
// import User from "./User/Pages/User"
// import Places from "./Places/Pages/Places/Places";
import MainNavigation from "./Shared/component/Navigation/MainNavigation/MainNavigation"
// import UserPlaces from "./Places/Pages/UserPlaces/UserPlaces";
// import UpdatePlaces from "./Places/Pages/UpdatePlaces/UpdatePlaces"
// import Auth from "./User/Pages/Auth/Auth";
import { authContext } from "./Shared/Context/auth-context";
import { useAuth } from "./Shared/Hooks/authHook";
import LoadingSpinner from "./Shared/component/UIElements/LoadingSpinner/LoadingSpinner";
//we imported BrowserRouter and using react facility chnaged name to Router, Route will help to set path for each pages, Redirect will helps to redirect
//switch from route helps us to select the specific router based on the path called without switch react will render everything from top to bottom 
//-so even if you specify path in url last route will work so use switch

const User = React.lazy(() => import("./User/Pages/User"))
const Places = React.lazy(() => import("./Places/Pages/Places/Places"))
const UserPlaces = React.lazy(() => import("./Places/Pages/UserPlaces/UserPlaces"))
const UpdatePlaces = React.lazy(() => import("./Places/Pages/UpdatePlaces/UpdatePlaces"))
const Auth = React.lazy(() => import("./User/Pages/Auth/Auth"))


const App = () => {

const {token, logIn, logOut, userId} = useAuth();
let routes;

if(token){
  routes = (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>   {/* help of exact here is it will render exact path for example / will come for all path so it will render all if exact true only / will render if you want exact to be exact={true} give or simple exact enough*/}
          <User/>
        </Route>
        <Route path="/:userId/places">
            <UserPlaces/>
        </Route>
        <Route path="/places/new">
           <Places/>
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlaces/>                {/* this should not be added above /places/new route because here we're using params so if put this above places/new it will consider /new as this route and redirect here so if you keep it below apart from new it will redirect everthing to here*/}
        </Route>
        <Redirect to="/"/>
        </Switch>
      </React.Fragment>
  );
}else{
  routes = (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>   {/* help of exact here is it will render exact path for example / will come for all path so it will render all if exact true only / will render if you want exact to be exact={true} give or simple exact enough*/}
          <User/>
        </Route>
        <Route path="/:userId/places">
            <UserPlaces/>
        </Route>
        <Route path="/auth">
          <Auth/>                {/* this should not be added above /places/new route because here we're using params so if put this above places/new it will consider /new as this route and redirect here so if you keep it below apart from new it will redirect everthing to here*/}
        </Route>
        <Redirect to="/auth"/>
    </Switch>
  </React.Fragment>     
  );
}

  return (
    <authContext.Provider value={{isLoggedIn: !!token,token: token, userId: userId, logIn: logIn, logOut: logOut}}>       {/*//from here only we are sharing to auth context file  //uses of using provider here is it will convert the authContext to a component so now we can use the value of authcontext and share to below component and value here will update the context in that context file whenever it changes so whenever the value chnages the component whichever uses it will rerender*/}
    <Router>
      <MainNavigation/> {/* why we added our header because if we place here it is just one time other wise you have place it in every pages folder and on the page and only the component placed inside switch will change while routing */}
      <main>
        <Suspense fallback={<div className="center"><LoadingSpinner/></div>}>{routes}</Suspense>
        </main>
    </Router>
    </authContext.Provider>
  )

}

export default App;


//here in this :userID will take any string  or character dynamically and load the URL related to that here wehave defined already /uiserid/places in useritem.js so it will load that
