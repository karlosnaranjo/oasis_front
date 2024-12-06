import { Button } from "@mui/material";
import replyArrow from "../../../../../pages/transactions/work_orders/comment/images/icon-reply.svg";

const ReplyButton = ({ functionality }) => {
  return (
    <Button
      startIcon={<img src={replyArrow} alt="reply icon" />}
      sx={{
        color: "custom.moderateBlue",
        fontWeight: 500,
        textTransform: "capitalize",
      }}
      onClick={() => {
        functionality();
      }}
    >
      Reply
    </Button>
  );
};

export default ReplyButton;
