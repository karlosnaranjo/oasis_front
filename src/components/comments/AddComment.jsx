import { Avatar, Card, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import CommentContext from "../../pages/transactions/work_orders/comment/commentContext";
import Username from "./Reusable/Username";
import CreatedAt from "./Reusable/CreatedAt";

import theme from "./styles";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import SendButton from "./Reusable/Buttons/BgButtons/SendButton";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const AddComment = () => {
  const { IMGOBJ, currentUser } = useContext(CommentContext);
  const [commentTxt, setCommentTxt] = useState("");
  const [isPriority, setIsPriority] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  console.log('AddComment',currentUser);
  const handlePriorityChange = (event) => {
    setIsPriority(event.target.checked);
  };
  const handleProductChange = (event) => {
    setIsProduct(event.target.checked);
  };


  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Box sx={{ p: "5px" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPriority}
                onChange={handlePriorityChange}
                name="isPriority"
                color="primary" // Cambia el color del checkbox según tus preferencias
              />
            }
            label="Prioritario"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isProduct}
                onChange={handleProductChange}
                name="isProduct"
                color="primary" // Cambia el color del checkbox según tus preferencias
              />
            }
            label="Asociado al producto"
          />
          <Stack direction="row" spacing={2} alignItems="flex-start">
            {/* <Avatar
              src={IMGOBJ.general}
              variant="rounded"
              alt="user-avatar"
            /> */}
            <Username userName={currentUser.username} />
            <CreatedAt createdAt={new Date().toLocaleString()} />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <EditableCommentField
              commentText={commentTxt}
              setCommentText={setCommentTxt}
              placeHolder="Escriba un comentario"
            />
            <SendButton isPriority={isPriority} isProduct={isProduct} commentTxt={commentTxt} setCommentTxt={setCommentTxt} />
          </Stack>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default AddComment;
