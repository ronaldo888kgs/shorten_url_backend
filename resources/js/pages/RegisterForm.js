import React, {useState} from 'react';
import '../../css/app.css'

function RegisterForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    function doRegister()
    {
        if(!name || !email || !password || !confirm)
        {
            setError('Not allowed empty field');
            return;
        }

        if(password != confirm)
        {
            setError('Mismatched password and confirm');
            return;
        }

        const fd = new FormData();
        fd.append('name', name);
        fd.append('email', email);
        fd.append('password', password);
        fd.append('confirm_password', confirm);

        axios.post('http://127.0.0.1:8000/api/register', fd)
        .then(
            res => {
                if(res.data.status == "success")
                {
                    window.location.href = "/";
                    
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
                    <h2>Create new user</h2>
                </div>
                <div className="formRow">
                    Name : <input type="text" placeholder="Name" className="form-control" value={name} onChange={e => setName(e.target.value)} ></input>
                </div>
                <div className="formRow">
                    Email : <input type="text" placeholder="Email" className="form-control"  value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="formRow">
                    Password : <input type="password" placeholder="Password" className="form-control" value={password}  onChange={e => setPassword(e.target.value)} ></input>
                </div>
                <div className="formRow">
                    Confirm Password : <input type="password" placeholder="Password" className="form-control" value={confirm} onChange={e => setConfirm(e.target.value)}></input>
                </div>
                {error != '' && 
                    <h6 className="errorRow formRow">
                        {error}
                    </h6>
                }
                <div className="formRow">
                    <button className="btn btn-success form-control" onClick={doRegister}>Register</button>
                </div>
                <div className="formRow">
                    Already registered, go to <a href='/login'>login</a>
                </div>
                
            </div>
        </div>
    );  
}

export default RegisterForm;