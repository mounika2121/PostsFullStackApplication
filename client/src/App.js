import Home from './Components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreatePost from './Components/CreatePost';
import EachPost from './Components/EachPost';
import Login from './Components/Login';
import Registration from './Components/Registration';
import {AuthContext} from './Context/AuthContext';
import {useState, useEffect} from 'react';
import axios from 'axios';
import NotFound from './Components/NotFound';
import Profile from './Components/Profile';
import ChangePassword from './Components/ChangePassword';

import './App.css';

const App = () => {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(()=> {
    axios.get("http://localhost:3007/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) =>{
      if (response.data.error){
        setAuthState({username: "",id: 0,status: false});
      }
      else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path='/createpost' exact Component={CreatePost} />
            <Route path="/post/:id" exact Component={EachPost} />
            <Route path="/login" exact Component={Login} />
            <Route path="/registration" exact Component={Registration} />
            <Route path='/profile/:id' exact Component={Profile} />
            <Route path='/changepassword' exact Component={ChangePassword} />
            <Route path='*' Component={NotFound} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App;
