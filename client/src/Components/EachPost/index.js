import { useParams, useNavigate } from 'react-router-dom'
import { useEffect , useState, useContext} from 'react';
import axios from 'axios';
import Header from '../Header';
import { MdDeleteSweep } from "react-icons/md";
import {AuthContext} from '../../Context/AuthContext';
import './index.css'

const EachPost = () => {
    let { id } = useParams();

    const [eachPost, setEachPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authState} = useContext(AuthContext);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3007/Posts/${id}`).then((response)=> {
            console.log(response)
            setEachPost(response.data);
        });

        axios.get(`http://localhost:3007/comments/${id}`).then((response)=> {
            setComments(response.data);
        });

      }, [id]);

    const addComment = () => {
        axios.post("http://localhost:3007/comments", {commentBody: newComment , PostId: id}, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
        )
        .then((response) => {
            if (response.data.error){
                console.log(response.data.error)
            }
            else{
                const commentToAdd = {commentBody: newComment, username: response.data.username};
                setComments([...comments, commentToAdd]);
                setNewComment("");
            }
            
        });
    }

    const onClickDelete = (id) => {
        axios.delete(`http://localhost:3007/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
        .then(() => {
            setComments(comments.filter((val) => val.id !== id));
        })
        .catch((error) => {
            console.error('Error deleting comment:', error);
        });
    };

    const deletePost = (id) => {
        axios.delete(`http://localhost:3007/Posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response)=> {
            console.log(response);
            navigate("/");
        });
    }

    const editPost = (option) =>{
        if (option === "title"){
            let newTitle = prompt("Enter new title:");

            axios.put("http://localhost:3007/Posts/title",{
                newTitle: newTitle,
                id: id,
            },{
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })

            setEachPost({...eachPost, title: newTitle})

        }else{
            let newText = prompt("Enter new Text:");

            axios.put("http://localhost:3007/Posts/postText",{
                newText: newText,
                id: id,
            },{
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })

            setEachPost({...eachPost, postText: newText})
        }
    }
    

    return(
        <>
            <Header />
            <div className='each-post-container'>
            <div className='each-post-items'>
                <h3 className='title' onClick={()=>{
                    if (authState.username === eachPost.username){
                        editPost("title")
                    }
                    }}>{eachPost.title}</h3>
                <p className='text text-height' onClick={()=>{
                    if(authState.username === eachPost.username){
                        editPost("body")
                    }
                    }}>{eachPost.postText}</p>
                <div className='like-container'>
                    <p className='each-username'>Post created by {eachPost.username}</p>
                    {authState.username === eachPost.username && (
                        <button type="button" className="delete-btn delete-post" onClick={()=>{deletePost(eachPost.id)}}>
                            <MdDeleteSweep size={22} color='white'/>
                        </button>
                    )}
                </div>
            </div>
            <div>
                <div>
                    <h2 className='coments-heading'>Comments:</h2>
                    <div>
                        <input type="text" 
                         placeholder='comment'
                         className='comment-input'
                         value={newComment} 
                         onChange={(e) => {setNewComment(e.target.value)}} 
                         />
                        <button onClick={addComment} className='login-btn'>Add Comment</button>
                    </div>
                </div>
                <div>
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='list-of-comments'>
                                <p>{comment.commentBody}</p>
                                <div className='delete-icon-containner'>
                                    <p className='comment-username'>User: {comment.username}</p>
                                    {authState.username === comment.username && 
                                    <button type="button" onClick={()=>{onClickDelete(comment.id)}} className="delete-btn">
                                        <MdDeleteSweep size={20} color='gray'/>
                                    </button>}  
                                </div>
                            </div>
                            )
                    })}
                </div>
            </div>
            </div>
        </>
    )
}

export default EachPost