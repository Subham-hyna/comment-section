import React, { useState } from 'react'
import Modal from 'react-modal';
import './Reply2.css'
import { CommentState } from "../context/CommentProvider";
import Reply3 from './Reply3';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    
  },
};

const Reply2 = ({c , mainIndex, reply1Index}) => {
    const {comment, setComment } = CommentState();
    const [isStar , setIsStar] = useState(comment[mainIndex].replies[reply1Index].isStared ? false : true);
    const [reply3 , setReply3] = useState("");

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }

  
    function closeModal() {
      setIsOpen(false);
    }
    const handleStaring = () => {
        setIsStar(!isStar);
        const commentCopy = [...comment];
        commentCopy[mainIndex].replies[reply1Index].isStared = isStar;
        setComment(commentCopy);
        localStorage.setItem("commentInfo", JSON.stringify(commentCopy));
}

const deleteHandler = () => {
    const commentCopy = [...comment];
    let subReplyCount = commentCopy[mainIndex].replies[reply1Index].replies.length ;
    subReplyCount > 0 ? subReplyCount=subReplyCount+1 : subReplyCount=1;
    commentCopy[mainIndex].replies.splice(reply1Index,1);
    commentCopy[mainIndex].replyCount -= subReplyCount;
    setComment(commentCopy);
    localStorage.setItem("commentInfo", JSON.stringify(commentCopy));
}

const Reply3submit = (e) => {
    e.preventDefault();
    const commentCopy = [...comment];
    if(!reply3){
        alert("Enter text");
        return;
    }
    const today = new Date();
    const datePosted = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
    const level = 1;
    const isStared = false;
    const replies = [];
    const content = reply3;

    const newComment = {
        content,
        level,
        datePosted,
        isStared,
        replies
    }
    commentCopy[mainIndex].replyCount = commentCopy[mainIndex].replyCount + 1;
    commentCopy[mainIndex].replies[reply1Index].replies.push(newComment);
    setComment(commentCopy);
    localStorage.setItem("commentInfo", JSON.stringify(commentCopy));
    closeModal();
    setReply3("");
}
  return (
    <>
    <div className='reply-2'>
        <div>
        <h3>{c.content}</h3>
        <span onClick={handleStaring} >{c.isStared ? <p>&#9733;</p> : <p>&#9734;</p> }</span>
        </div>
        <span>
            <p>Date Posted: {c.datePosted}</p>
            <button onClick={openModal}>Reply</button>
            <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form className='reply-modal' onSubmit={Reply3submit}>
            <input placeholder='Enter a Reply' value={reply3} onChange={(e)=>setReply3(e.target.value)}/>
            <button type='submit'>Send</button>
        </form>
      </Modal>
            <button onClick={deleteHandler} >Delete</button>
        </span>
        <div className='reply-3-box'>
        {comment[mainIndex].replies[reply1Index].replies.map((c,i)=>
                <Reply3 c={c} key={mainIndex} mainIndex={mainIndex} reply1Index={reply1Index} reply2Index={i} />
                )}
        </div>
    </div>
    </>
  )
}

export default Reply2