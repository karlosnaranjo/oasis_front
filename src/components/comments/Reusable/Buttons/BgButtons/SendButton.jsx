import { Button } from "@mui/material";
import React, { useContext } from "react";
import CommentContext from "../../../../../pages/transactions/work_orders/comment/commentContext";

const SendButton = ({ isPriority, isProduct, setCommentTxt, commentTxt }) => {
  const { addComment } = useContext(CommentContext);

  return (
    <Button
      size="large"
      sx={{
        bgcolor: "custom.moderateBlue",
        color: "neutral.white",
        p: "8px 25px",
        "&:hover": {
          bgcolor: "custom.lightGrayishBlue",
        },
      }}
      // GUARDA LOS DATOS 
      onClick={(e) => {
        !commentTxt.trim() 
          ? e.preventDefault() 
          : addComment(isPriority, isProduct,commentTxt.trim());
        setCommentTxt("");
      }}
    >
      Enviar
    </Button>
  );
};

export default SendButton;
