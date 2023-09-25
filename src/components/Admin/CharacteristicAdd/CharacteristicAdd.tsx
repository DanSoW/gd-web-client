import React, { FC, useEffect, useState } from "react";
import styles from "./CharacteristicAdd.module.scss";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormHelperText from "@mui/material/FormHelperText";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ISizeModel } from "src/models/ISize";

export interface ICreateContentProps {
  addHandler: (
    values: IArticleValues,
    images: Array<{ data_url: string; file?: File }>
  ) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CharactetisticAdd: FC<ICreateContentProps> = ({
  addHandler,
  open,
  setOpen,
}) => {
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

  const [size, setSize] = useState<ISizeModel | null>(null);

  const handleChangeSize = (event: SelectChangeEvent) => {
    if (event.target.value.length === 0) {
      setSize(null);
      return;
    }

    const value: ISizeModel = JSON.parse(event.target.value);
    setSize(value);

    setForm({
      ...form,
      width: value.width,
      height: value.height,
    });

    setDisable(false);
  };

  const handleChangeTarget = (event: SelectChangeEvent) => {
    setForm({
      ...form,
      target: event.target.value,
    });

    setDisable(false);
  };

  const handleChangeAdditionalFeatures = (event: SelectChangeEvent) => {
    setForm({
      ...form,
      additional_features: event.target.value,
    });

    setDisable(false);
  };

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
    is_defect: false,
    additional_features: "",
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

  const handleCharacteristicAdd = () => {
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

    addHandler(
      {
        ...form,
        discount: Math.round(
          ((form.price_without_discount - form.price) /
            form.price_without_discount) *
            100
        ),
      },
      images
    );
  };

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          {false && <CircularIndeterminate />}
          <DialogTitle>Создание нового артикула</DialogTitle>
          <DialogContent
            style={{ overflowX: "hidden", padding: 15, margin: 0 }}
          >
            <DialogContentText></DialogContentText>
            <div className={styles.content}>
              <br />
              <TextField
                required={true}
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
              />
              <br />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Размер (ширина/высота, мм)
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={size ? JSON.stringify(size) : ""}
                  label="Размер (ширина/высота, мм)"
                  onChange={handleChangeSize}
                >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem
                    value={JSON.stringify({
                      width: 780,
                      height: 2000,
                    })}
                  >
                    780х2000
                  </MenuItem>
                  <MenuItem
                    value={JSON.stringify({
                      width: 800,
                      height: 2030,
                    })}
                  >
                    800х2030
                  </MenuItem>
                  <MenuItem
                    value={JSON.stringify({
                      width: 860,
                      height: 2050,
                    })}
                  >
                    860х2050
                  </MenuItem>
                  <MenuItem
                    value={JSON.stringify({
                      width: 900,
                      height: 2050,
                    })}
                  >
                    900х2050
                  </MenuItem>
                  <MenuItem
                    value={JSON.stringify({
                      width: 960,
                      height: 2070,
                    })}
                  >
                    960х2070
                  </MenuItem>
                  <MenuItem
                    value={JSON.stringify({
                      width: 980,
                      height: 2080,
                    })}
                  >
                    980х2080
                  </MenuItem>
                  <MenuItem
                    value={JSON.stringify({
                      width: 1050,
                      height: 2070,
                    })}
                  >
                    1050х2070
                  </MenuItem>
                </Select>
              </FormControl>
              <br />
              <Checkbox
                title="Открывание (по умолчанию - левое)"
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
                title="Основной замок (по умолчанию - нет)"
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
                title="Дополнительный замок (по умолчанию - нет)"
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
                title="Наличие зеркала (по умолчанию - нет)"
                value={form?.mirror || false}
                setValue={(value) => {
                  setForm({
                    ...form,
                    mirror: value,
                  });
                }}
              />
              <br />
              <Checkbox
                title="Без дефекта (по умолчанию - с дефектом)"
                value={form?.is_defect || false}
                setValue={(value) => {
                  setForm({
                    ...form,
                    is_defect: value,
                  });
                }}
              />
              <br />
              <br />
              <TextField
                required={true}
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
                required={true}
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
                required={true}
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
              <FormControl required={true} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Назначение двери
                </InputLabel>
                <Select
                  required={true}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.target}
                  label="Назначение двери"
                  onChange={handleChangeTarget}
                >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Квартирная"}>Квартирная</MenuItem>
                  <MenuItem value={"Для дома и дачи"}>Для дома и дачи</MenuItem>
                </Select>
              </FormControl>
              <br />
              <FormControl required={true} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Дополнительные особенности
                </InputLabel>
                <Select
                  required={true}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.additional_features}
                  label="Дополнительные особенности"
                  onChange={handleChangeAdditionalFeatures}
                >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Устаревшая модель"}>
                    Устаревшая модель
                  </MenuItem>
                  <MenuItem value={"Витринный образец"}>
                    Витринный образец
                  </MenuItem>
                </Select>
              </FormControl>
              <br />
              <TextField
                required={true}
                id="outlined-basic"
                label="Цена без скидки"
                variant="outlined"
                type="number"
                name="price_without_discount"
                onChange={onChange}
                sx={{
                  width: "100%",
                }}
              />
              <br />
              <TextField
                required={true}
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
                required={true}
                id="outlined-basic"
                label="Скидка (%)"
                variant="outlined"
                type="number"
                name="discount"
                value={
                  form.price_without_discount && form.price
                    ? Math.round(
                        ((form.price_without_discount - form.price) /
                          form.price_without_discount) *
                          100
                      )
                    : 0
                }
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
            <Button onClick={handleCharacteristicAdd} disabled={disable}>
              Создать
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default React.memo(CharactetisticAdd);
