import React, { useState } from 'react'
import './Reply3.css'
import { CommentState } from "../context/CommentProvider";


const Reply2 = ({c , mainIndex, reply1Index , reply2Index}) => {
    const {comment, setComment } = CommentState();
    const [isStar , setIsStar] = useState(c.isStared);

    const handleStaring = () => {
        setIsStar(!isStar);
        const commentCopy = [...comment];
        commentCopy[mainIndex].replies[reply1Index].replies[reply2Index].isStared = isStar;
        setComment(commentCopy);
        localStorage.setItem("commentInfo", JSON.stringify(commentCopy));
}

const deleteHandler = () => {
    const commentCopy = [...comment];
    commentCopy[mainIndex].replies[reply1Index].replies.splice(reply2Index,1);
    commentCopy[mainIndex].replyCount -= 1; 
    setComment(commentCopy);
    localStorage.setItem("commentInfo", JSON.stringify(commentCopy));
}

  return (
    <>
    <div className='reply-3'>
        <div>
        <h3>{c.content}</h3>
        <span onClick={handleStaring} >{c.isStared ? <p>&#9733;</p> : <p>&#9734;</p> }</span>
        </div>
        <span>
        <p>Date Posted: {c.datePosted}</p>
            <button onClick={deleteHandler} >Delete</button>
        </span>
    </div>
    </>
  )
}

export default Reply2