import { useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import {login} from './store/authSlice';

const App = () => {
  const auth = useSelector((store)=>store.authReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("jwt")){
      dispatch(login({...localStorage,['basic_info']:JSON.parse(localStorage.getItem('basic_info')), status: true}));
    }
  },[auth.status]);
  return <>{auth.status ? <Dashboard /> : <Login />}</>;
};

export default App;
