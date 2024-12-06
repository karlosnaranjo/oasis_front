import React, { useContext } from "react";
import { Container, Stack } from "@mui/material";
import Comment from "./Comment";
import AddComment from "./AddComment";
import CommentContext from "../../pages/transactions/work_orders/comment/commentContext";

const Core = () => {
  const { commentSection } = useContext(CommentContext);

  return (
    <Container maxWidth="l">
      <Stack spacing={1}>
        <AddComment />
        {commentSection.map((comment) => {
          return <Comment key={comment.id} onPass={comment} />;
        })}
      </Stack>
    </Container>
  );
};

export default Core;
