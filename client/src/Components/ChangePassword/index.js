import React, {useState} from 'react';
import Header from '../Header';
import axios from 'axios';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const changePassword = () => {
        axios.put("http://localhost:3007/auth/changepassword", {
            oldPassword: oldPassword,
            newPassword: newPassword,
        }, {
            headers: { accessToken: localStorage.getItem("accessToken"),}
        }).then((response) => {
            if (response.data.error){
                alert(response.data.error);
            }
        })
    }

    return(
        <>
            <Header />
            <div className='createpost-top-container'>
                <h1 className='create-post-heading'>Change Your Password</h1>
                <form className='registration-containner'>
                    <div>
                        <label htmlFor='oldPassword'>Old Password</label>
                        <input type="text" placeholder='Enter Old Password' 
                        id="oldPassword" value={oldPassword}
                        onChange={(e)=>{setOldPassword(e.target.value)}} 
                        className='create-input-post' />
                    </div>
                    <div className='input-label-container'>
                        <label htmlFor='newPassword'>New Password</label>
                        <input type="text" placeholder='Enter New Password' 
                        id="newPassword" value={newPassword} 
                        onChange={(e)=>{setNewPassword(e.target.value)}} 
                        className='create-input-post' />
                    </div>
                    <button type="submit" className='login-btn' onClick={changePassword}>Save</button>
                </form>
            </div>
        </>
    )
}

export default ChangePassword
