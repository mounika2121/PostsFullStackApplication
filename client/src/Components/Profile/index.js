import { useEffect, useState,useContext} from 'react';
import axios from 'axios';
import Header from '../Header';
import './index.css';
import { useParams, useNavigate } from 'react-router-dom';
import { BiSolidLike } from "react-icons/bi";
import { AuthContext } from '../../Context/AuthContext';

const Profile = () => {

    const {id} = useParams();
    console.log(id);
    const [username, setUserName] = useState("");
    const [listOfUserPosts, setListOfUserPosts] = useState([]);
    const {authState} = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:3007/auth/basicinfo/${id}`).then((response)=>{
            setUserName(response.data.username);
        });

        axios.get(`http://localhost:3007/posts/byuserId/${id}`).then((response)=>{
            setListOfUserPosts(response.data);
        })
    },[id]);


    return(
        <>
            <Header />
            <h1 className='profile-user'>Username: {username}</h1>
            {
            authState.username === username && 
            <button type="button" className='change-password-btn' onClick={() =>{navigate("/changepassword")}}>
                Change Password
            </button>
            }
            <div className='each-userpost-container'>
                <ul className='post-list'>
                    {listOfUserPosts.map((eachpost)=>(
                        <div className='list-item'>
                            <li className='posts-lists-items'>
                                <h4 className='title'>{eachpost.title}</h4>
                                <p className='text post-content'>{eachpost.postText}</p>
                                <div className='like-container'>
                                    <p className='username'>{eachpost.username}</p>
                                    <div className='likes-count-container'>
                                        <button type='button' className='like-btn' >
                                            <BiSolidLike size={25} />
                                        </button>
                                        <span className='like-count'>{eachpost.Likes.length}</span>
                                    </div>
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Profile