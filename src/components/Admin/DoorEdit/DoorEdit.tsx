import React, { FC, useEffect, useState } from "react";
import styles from "./DoorEdit.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import CircularIndeterminate from "src/components/CircularIndeterminate/CircularIndeterminate";
import { BlobToFile, dataURLToBlob, isDataURL } from "src/utils/file";
import messageQueueAction from "src/store/actions/MessageQueueAction";
import {
  IArticleModel,
  IArticleValues,
  IDoorModel,
  IDoorValues,
} from "src/models/IDoorModel";
import ImageUpload from "src/components/ImageUpload";
import Checkbox from "src/components/UI/Checkbox";

export interface IDoorEditProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editHandler: (
    values: IDoorValues,
    imageEntry: Array<{ data_url: string; file?: File }>,
    imageExit: Array<{ data_url: string; file?: File }>
  ) => void;
  content: IDoorModel;
}

const DoorEdit: FC<IDoorEditProps> = ({
  open,
  setOpen,
  editHandler,
  content,
}) => {
  const authSelector = useAppSelector((reducer) => reducer.authReducer);
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);
  const [disable, setDisable] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const [contentType, setContentType] = React.useState("10");
  const [imageEntry, setImageEntry] = React.useState<
    Array<{ data_url: string; file?: File }>
  >([
    {
      data_url: content?.image_entry as string,
    },
  ]);
  const [imageExit, setImageExit] = React.useState<
    Array<{ data_url: string; file?: File }>
  >([
    {
      data_url: content?.image_exit as string,
    },
  ]);

  const [form, setForm] = useState<IDoorValues>({
    ...(content as unknown as IDoorValues),
  });

  // @ts-ignore
  const onChangeImageEntry = async (imageList, addUpdateIndex) => {
    setDisable(false);
    setImageEntry(imageList);
  };

  // @ts-ignore
  const onChangeImageExit = async (imageList, addUpdateIndex) => {
    setDisable(false);
    setImageExit(imageList);
  };

  const onChange = (data: any) => {
    setForm({
      ...form,
      [data.target.name]: data.target.value,
    });

    setDisable(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setContentType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onUpdateContent = () => {
    if (imageEntry.length === 0) {
      dispatch(
        messageQueueAction.addMessage(
          null,
          "error",
          "Необходимо добавить входное изображение двери"
        )
      );
      return;
    }

    if (imageExit.length === 0) {
      dispatch(
        messageQueueAction.addMessage(
          null,
          "error",
          "Необходимо добавить выходное изображение двери"
        )
      );
      return;
    }

    if (form.title.length === 0 || form.description.length === 0) {
      dispatch(
        messageQueueAction.addMessage(
          null,
          "error",
          "Необходимо добавить данные для контента (название и описание)"
        )
      );
      return;
    }

    editHandler(form, imageEntry, imageExit);
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          {false && <CircularIndeterminate />}
          <DialogTitle>Редактирование двери {content?.title}</DialogTitle>
          <DialogContent style={{ overflowX: "hidden", padding: 15, margin: 0 }}>
            <DialogContentText></DialogContentText>
            <div className={styles.content}>
              <br />
              <ImageUpload
                title={"Входная дверь *"}
                subtitle={"Загрузить изображение"}
                value={imageEntry}
                onChange={onChangeImageEntry}
                multiple={false}
              />
              <br />
              <ImageUpload
                title={"Выходная дверь *"}
                subtitle={"Загрузить изображение"}
                value={imageExit}
                onChange={onChangeImageExit}
                multiple={false}
              />
              <br />
              <TextField
                required={true}
                id="outlined-basic"
                label="Название"
                variant="outlined"
                name="title"
                defaultValue={content?.title}
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                required={true}
                id="outlined-basic"
                label="Описание"
                variant="outlined"
                name="description"
                defaultValue={content?.description}
                onChange={onChange}
                multiline={true}
                rows={4}
                sx={{
                  width: "100%",
                }}
                inputProps={{ maxLength: 256 }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={onUpdateContent} disabled={disable}>
              Изменить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default React.memo(DoorEdit);
