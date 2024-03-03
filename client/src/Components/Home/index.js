import axios from 'axios';
import {useEffect, useState,useContext} from 'react';
import PostList from '../PostList'
import Header from '../Header';
import { AuthContext } from '../../Context/AuthContext';
import {useNavigate} from 'react-router-dom'

import './index.css';

const Home = () => {

  const [listOfPost, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const {authState} = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("accessToken")){
      navigate('/login');
    }
    else{
      axios.get("http://localhost:3007/Posts",{
        headers: { accessToken: localStorage.getItem("accessToken")}
    }).then((response)=> {
      setListOfPosts(response.data.listOfPosts);
      setLikedPosts(response.data.likedPosts.map((like)=>(like.PostId)));
      });
    }
  }, [authState.status, navigate]);
  
  const updateLikes = (postId) =>{
    if(likedPosts.includes(postId)){
      setLikedPosts(
        likedPosts.filter((id)=> id !== postId)
      );
    }
    else{
      setLikedPosts([...likedPosts, postId]);
    }
  }

  return (
    <>
        <Header />
        <div className="App">
        <ul className='post-list'>
        {listOfPost.map((eachPostItem) => (
            <PostList key = {eachPostItem.id} postItemDetails={eachPostItem} styleLikes={likedPosts} updateLikes={updateLikes} />
        ))}
        </ul>
        </div>
    </>
  );
}

export default Home;
