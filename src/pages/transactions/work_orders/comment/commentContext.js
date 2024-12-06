import { createContext } from "react";
import general from "./images/avatars/image-general.png";

const CommentContext = createContext();
const IMGOBJ = { general };

export function CommentProvider({
  work_order_id,
  currentUser,
  saveComment,
  commentSection,
  setCommentSection,
  children,
}) {
  const addComment = (isPriority, isProduct, data) => {
    saveComment({
      work_order_id: work_order_id,
      isPriority: isPriority,
      isProduct: isProduct,
      comment: data,
    });
    setCommentSection([
      ...commentSection,
      {
        id: Math.floor(Math.random() * 10000),
        content: data,
        createdAt: "Just now",
        score: 0,
        replies: [],
        user: { username: currentUser.username },
      },
    ]);
  };

  const deleteComment = (commentId) => {
    setCommentSection(
      commentSection.filter((comment) => comment.id !== commentId)
    );
  };

  const addReply = (replyContent) => {};

  const deleteReply = (id) => {};

  return (
    <CommentContext.Provider
      value={{
        currentUser,
        commentSection,
        IMGOBJ,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export default CommentContext;
