import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import useToken from './useToken';

import '../../css/app.css';

import {getOriginUrl} from '../service/LinkService';

function App() {

    let {token, setToken, removeToken} = useToken();

    // if(!token)
    // {
    //     return (<LoginForm getAuthToken={getAuthToken}/>);
    // }

    if(window.location.pathname != '/' && window.location.pathname !='/login' && window.location.pathname != '/register')
    {
      let shortUrl = window.location.pathname.substring(1);
      getOriginUrl(shortUrl).then(res => {
        if(res.status == "success")
        {
          window.location.href = res.url;
        }else{
          alert('not found url');
          window.location.href = "/";
        }
      });
      return(
        <div>
          getting urls
        </div>
      );
    }
    return (
      <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={!token ? <LoginForm getAuthToken={setToken}/> :  <Dashboard token={token} removeToken={removeToken}/>}>
                </Route>
                <Route path="/login" element={<LoginForm getAuthToken={setToken}/>}>
                </Route>
                <Route path="/register" element={<RegisterForm />}>
                </Route>
            </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
