import { useState, FC, memo } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export interface IQuestionDialogProps {
  text: string;
  subText: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: () => void;
}

/**
 * Обобщённый компонент диалога для подтверждения действий пользователя
 * @param param0 Параметры для функционального компонента
 * @returns { JSX.Element } Компонент
 */
const QuestionDialog: FC<IQuestionDialogProps> = ({
  text,
  subText,
  open,
  setOpen,
  action,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    action();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{text}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {subText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Нет</Button>
          <Button onClick={handleAgree} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(QuestionDialog);
