import {useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Header from '../Header'
import {AuthContext} from '../../Context/AuthContext';
import './index.css'

const Login = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    let navigate = useNavigate();

    const onClickLogin = () => {
        const data = {username: username, password: password}
        axios.post("http://localhost:3007/auth/login", data)
        .then((response)=> {
            if (response.data.error){
                console.log(response.data.error);
            }
            else{
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({username: response.data.username,id: response.data.id,status: true});
                navigate("/");
            }
        })
        .catch((error) => {
            console.error("Error creating post:", error);
        });
    };

    return(
        <>  <Header />
            <div className='createpost-top-container'>
            <h1 className='create-post-heading'>Login</h1>
                <div className='registration-containner'>
                    <div>
                        <label>Username</label><br />
                        <input type="text" className='create-input-post' onChange={(e)=>{setUserName(e.target.value)}} value={username} />
                    </div>
                    <div>
                        <label>Password</label><br />
                        <input type="password" className='create-input-post' onChange={(e)=>{setPassword(e.target.value)}} value={password} />
                    </div>
                    <div>
                        <button type="submit" className='login-btn' onClick={onClickLogin}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login