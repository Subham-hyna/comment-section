import React, { useState } from 'react'
import './Reply1.css'
import { CommentState } from "../context/CommentProvider";
import Reply2 from './Reply2';
import Modal from 'react-modal';

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

const Reply1 = ({c , index}) => {
    const {comment, setComment } = CommentState();
    const [isStar , setIsStar] = useState(c.isStared ? false : true);
    const [reply2 , setReply2] = useState("");

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }

  
    function closeModal() {
      setIsOpen(false);
    }

    const handleStaring = async() => {
        setIsStar(!isStar);
      const commentCopy = [...comment];
      commentCopy[index].isStared = isStar;
      setComment(commentCopy);
      localStorage.setItem("commentInfo", JSON.stringify(commentCopy));
    }

    const deleteHandler = () => {
        const commentCopy = [...comment];
        commentCopy[index].replyCount = commentCopy[index].replyCount - 1;
        commentCopy.splice(index,1);
        setComment(commentCopy);
        localStorage.setItem("commentInfo", JSON.stringify(commentCopy));
    }

    const Reply2submit = (e) => {
        e.preventDefault();
        const today = new Date();
        const datePosted = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
        const level = 1;
        const isStared = false;
        const replies = [];
        const content = reply2;

        const newComment = {
            content,
            level,
            datePosted,
            isStared,
            replies
        }
        
        const commentCopy = [...comment];
        if(!reply2){
            alert("Enter text");
            return;
        }
        commentCopy[index].replyCount = commentCopy[index].replyCount + 1;
        commentCopy[index].replies.push(newComment);
        setComment(commentCopy);
        localStorage.setItem("commentInfo", JSON.stringify(commentCopy));
        closeModal();
        setReply2("");
    }
  return (
    <>
    <div className='reply-1'>
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
        <form className='reply-modal' onSubmit={Reply2submit}>
            <input placeholder='Enter a Reply' value={reply2} onChange={(e)=>setReply2(e.target.value)}/>
            <button type='submit'>Send</button>
        </form>
      </Modal>
            <button onClick={deleteHandler} >Delete</button>
        </span>
        <div className='reply-2-box'>
        {c.replies.map((c,i)=>
                <Reply2 c={c} key={index} mainIndex={index} reply1Index={i} />
                )}
        </div>
    </div>
    </>
  )
}

export default Reply1