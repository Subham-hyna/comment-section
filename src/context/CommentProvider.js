import { createContext, useContext, useState, useEffect } from "react";

const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const commentInfo = JSON.parse(localStorage.getItem("commentInfo"));
    if(commentInfo)
    setComment(commentInfo);
    else
    setComment([]);

  }, []);

  return (
    <CommentContext.Provider
      value={{
        comment,
        setComment
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const CommentState = () => {
  return useContext(CommentContext);
};

export default CommentProvider;
