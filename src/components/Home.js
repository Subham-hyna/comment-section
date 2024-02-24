import React, { useEffect, useState } from 'react'
import './Home.css'
import { CommentState } from "../context/CommentProvider";
import Reply1 from './Reply1';

const Home = () => {
    const {comment, setComment } = CommentState();

    const [post, setPost] = useState("");
    const [sortby, setSortBy] = useState("");

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        if(!post){
            alert("Enter Text");
            return;
        }
        const today = new Date();
        const datePosted = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
        const level = 1;
        const isStared = false;
        const replies = [];
        const content = post;
        const replyCount = 0;

        const newComment = {
            content,
            level,
            datePosted,
            isStared,
            replies,
            replyCount
        }
        const commentCopy = [...comment,newComment];
        setComment(commentCopy);
        setPost("");
        localStorage.setItem("commentInfo", JSON.stringify(commentCopy));
    }

    useEffect(()=>{
        if(sortby === "l2o"){
            const commentCopy = [...comment];
            commentCopy.reverse();
            setComment(commentCopy);
        }

        if( sortby === "o2l"){
            setComment(JSON.parse(localStorage.getItem("commentInfo")));
        }

        if( sortby === "replies"){  
            const commentCopy = [...comment];
            commentCopy.sort( (a,b) => b.replyCount - a.replyCount );
            setComment(commentCopy);
        }
        // eslint-disable-next-line
    },[sortby])


  return (
    <div className='comment-home'>
        <form className='post-comment' onSubmit={handleCommentSubmit}>
            <h2>What's on your mind?</h2>
            <input placeholder='POST A COMMENT' value={post} onChange={(e)=>setPost(e.target.value)} />
            <button type='submit'>POST</button>
        </form>

        <div className='all-comment'>
            <div className='sort-by'>
            <h2>All Comments</h2>
            <div>
                <p>Sort According to</p>
                <select value={sortby} onChange={(e)=>(setSortBy(e.target.value))}>
            <option value="" >Sort By</option>
            <option value="o2l" >Oldest Comments </option>
            <option value="l2o" >Latest Comments</option>
            <option value="replies" >Most Replies</option>
          </select>
            </div>
            </div>
            {!comment ? "" : 
            <div>
                {comment.map((c,index)=>
                
                <Reply1 c={c} key={index} index={index} />
                )}
            </div>
            }
        </div>
    </div>
  )
}

export default Home