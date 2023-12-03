import React, { FC, useEffect, useState } from "react";
import styles from "./DoorAdd.module.scss";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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

export interface IDoorAddProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addHandler: (
    values: IDoorValues,
    imageEntry: Array<{ data_url: string; file?: File }>,
    imageExit: Array<{ data_url: string; file?: File }>
  ) => void;
}

const DoorAdd: FC<IDoorAddProps> = ({ open, setOpen, addHandler }) => {
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
  >([]);
  const [imageExit, setImageExit] = React.useState<
    Array<{ data_url: string; file?: File }>
  >([]);

  const [form, setForm] = useState<IDoorValues>({
    title: "",
    description: "",
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

  const onAddContent = () => {
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

    addHandler(form, imageEntry, imageExit);

    setImageEntry([]);
    setImageExit([]);

    setForm({
      title: "",
      description: ""
    });


    /*dispatch(
      updateContent(
        {
          ...form,
          content_sales_id: content?.id as number,
        },
        image[0].file ? (image[0].file as File) : null,
        () => {
          handleClose();
        }
      )
    );*/
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          {false && <CircularIndeterminate />}
          <DialogTitle>Добавление новой двери</DialogTitle>
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
            <Button onClick={onAddContent} disabled={disable}>
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default React.memo(DoorAdd);
