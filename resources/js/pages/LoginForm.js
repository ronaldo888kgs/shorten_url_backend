import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/app.css'
import {
    Link,
    BrowserRouter, 
    Route, 
    Routes,
    matchPath,
    useParams,
  } from "react-router-dom"

function LoginForm(props){

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    function doLogin()
    {
        const fd = new FormData();
        fd.append('email', email);
        fd.append('password', password);
        axios.post('http://127.0.0.1:8000/api/login', fd)
        .then(
            res => {
                if(res.data.status == "success")
                {
                    props.getAuthToken(res.data.data.token);
                    
                }else{
                    setError(res.data.error);
                }
            }
        ).catch(
            error => {
                console.log('error', error);
            }
        )
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="loginForm">
                <div className="logoText">
                    <h2>URL Shortener</h2>
                </div>
                <div className="formRow">
                    <input type="text" className="form-control" value={email} onChange={e => setEmail(e.target.value)} ></input>
                </div>
                <div className="formRow">
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                {error != '' && 
                    <h6 className="errorRow formRow">
                        {error}
                    </h6>
                }
                <div className="formRow">
                    <button className="btn btn-success form-control" onClick={doLogin}>Login</button>
                </div>
                <div className="formRow">
                    Create a new <a href='/register'>account</a>
                </div>
                
            </div>
        </div>
    );  
}

export default LoginForm;





