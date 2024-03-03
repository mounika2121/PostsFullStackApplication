import React, { useState } from 'react';
import './index.css'
import {useNavigate} from 'react-router-dom';
import { BiSolidLike } from "react-icons/bi";
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = props => {
    const {postItemDetails, styleLikes, updateLikes} = props;
    const {title, postText, username,id,Likes,UserId} = postItemDetails;
    const [likesCount, setLikesCount] = useState(Likes.length);

    let navigate = useNavigate();

    const likedAPost = (id) => {
        axios.post("http://localhost:3007/Likes", {PostId: id},{
            headers: { accessToken: localStorage.getItem("accessToken")}
        }).then((response)=> {
            if (response.data.liked){
                setLikesCount(likesCount + 1);
            }else{
                setLikesCount(likesCount - 1);
            }
            })
            .catch((error) => {
                console.error('Error liking post:', error);
            });

            updateLikes(id);
    };


    return(
        <div className='list-item'>
            <li className='posts-lists-items'>
                <h4 className='title'>{title}</h4>
                <div onClick={() => { navigate(`/post/${id}`) }}>
                    <p className='text post-content'>{postText}</p>
                </div>
                <div className='like-container'>
                    <Link className='link' to={`/profile/${UserId}`}><p className='username'>{username}</p></Link>
                    <div className='likes-count-container'>
                        <button type='button' 
                            className={styleLikes.includes(id) ? 'like-btn' : 'un-like-btn'}  
                            onClick={()=>{likedAPost(id)}} >
                            <BiSolidLike size={25} />
                        </button>
                        <span className='like-count'>{likesCount}</span>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default PostList