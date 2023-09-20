import React, { FC, useEffect, useState } from "react";
import styles from "./CharacteristicAdd.module.scss";
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
import { IArticleModel, IArticleValues } from "src/models/IDoorModel";
import ImageUpload from "src/components/ImageUpload";
import Checkbox from "src/components/UI/Checkbox";

export interface ICreateContentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CharactetisticAdd: FC<ICreateContentProps> = ({ open, setOpen }) => {
  const authSelector = useAppSelector((reducer) => reducer.authReducer);
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);
  const [disable, setDisable] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const [contentType, setContentType] = React.useState("10");
  const [images, setImages] = React.useState<
    Array<{ data_url: string; file?: File }>
  >([]);

  const [form, setForm] = useState<IArticleValues>({
    title: "",
    description: "",
    width: 0,
    height: 0,
    opening_direction: false,
    main_lock: false,
    additional_lock: false,
    door_leaf_thickness: 0,
    sealing_contours: 0,
    color: "",
    target: "",
    mirror: false,
    price: 0,
    price_without_discount: 0,
    discount: 0,
    in_stock: 0,
  });

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

  // @ts-ignore
  const onChangeMultipleImage = (imageList) => {
    setImages(imageList);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onUpdateContent = () => {
    if (images.length === 0) {
      dispatch(
        messageQueueAction.addMessage(
          null,
          "error",
          "Необходимо добавить изображения артикула"
        )
      );
      return;
    }

    if (
      form.title.length === 0 ||
      form.description.length === 0 ||
      form.price <= 0
    ) {
      dispatch(
        messageQueueAction.addMessage(
          null,
          "error",
          "Необходимо добавить данные для контента (название, описание и цену)"
        )
      );
      return;
    }

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
          <DialogTitle>Создание нового артикула</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <div className={styles.content}>
              <br />
              <TextField
                id="outlined-basic"
                label="Название артикула"
                variant="outlined"
                name="title"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Описание"
                variant="outlined"
                name="description"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Ширина (мм)"
                variant="outlined"
                name="width"
                type="number"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Высота (мм)"
                variant="outlined"
                type="number"
                name="height"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <Checkbox
                title="Открывание (левое / правое)"
                value={form?.opening_direction || false}
                setValue={(value) => {
                  setForm({
                    ...form,
                    opening_direction: value,
                  });
                }}
              />
              <br />
              <Checkbox
                title="Основной замок (Нет / Есть)"
                value={form?.main_lock || false}
                setValue={(value) => {
                  setForm({
                    ...form,
                    main_lock: value,
                  });
                }}
              />
              <br />
              <Checkbox
                title="Дополнительный замок (Нет / Есть)"
                value={form?.additional_lock || false}
                setValue={(value) => {
                  setForm({
                    ...form,
                    additional_lock: value,
                  });
                }}
              />
              <br />
              <Checkbox
                title="Наличие зеркала (Нет / Есть)"
                value={form?.mirror || false}
                setValue={(value) => {
                  setForm({
                    ...form,
                    mirror: value,
                  });
                }}
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Толщина дверного полотна (мм)"
                variant="outlined"
                type="number"
                name="door_leaf_thickness"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Количество контуров уплотнения"
                variant="outlined"
                type="number"
                name="sealing_contours"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Цвет"
                variant="outlined"
                type="text"
                name="color"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Назначение двери"
                variant="outlined"
                type="text"
                name="target"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Скидка (%)"
                variant="outlined"
                type="number"
                name="discount"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Цена со скидкой"
                variant="outlined"
                type="number"
                name="price"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Цена без скидки"
                variant="outlined"
                type="number"
                name="price"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="В наличии (шт.)"
                variant="outlined"
                type="number"
                name="in_stock"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <br />
              <ImageUpload
                title={"Изображения *"}
                subtitle={"Загрузить изображения"}
                value={images}
                onChange={onChangeMultipleImage}
                multiple={true}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={onUpdateContent} disabled={disable}>
              Создать
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default React.memo(CharactetisticAdd);
