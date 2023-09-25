import React, { FC, useEffect, useState } from "react";
import styles from "./CharacteristicEdit.module.scss";
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
import AdminAction from "src/store/actions/AdminAction";
import { ISizeModel } from "src/models/ISize";

export interface ICreateContentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: IArticleModel | null;
  doors_id: number;
}

const CharacteristicEdit: FC<ICreateContentProps> = ({
  open,
  setOpen,
  content,
  doors_id,
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
  >(
    content?.images?.map((item) => {
      return {
        data_url: item?.url as string,
      };
    }) || []
  );

  const [form, setForm] = useState<IArticleValues>({
    ...(content as unknown as IArticleValues),
  });

  const [size, setSize] = useState<ISizeModel | null>(
    content
      ? {
          width: content?.width,
          height: content?.height,
        }
      : null
  );

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

    if (!content) {
      return;
    }

    // Определение изображений, которые будут удалены из квартиры
    const deleteImages: Array<string> = [];

    for (let i = 0; i < content.images.length; i++) {
      const image = content.images[i];
      if (
        !images.find((item) => {
          return item.data_url === image.url;
        })
      ) {
        const sepArr = image.url.split("/");
        deleteImages.push(sepArr[sepArr.length - 1]);
      }
    }

    // Определение изображений, которые будут добавлены в квартиру
    const addImages = images.filter((value) => {
      return value.file;
    });

    dispatch(
      AdminAction.doorCharacteristicEdit(
        doors_id,
        content?.id,
        form,
        addImages,
        deleteImages,
        () => {
          dispatch(
            messageQueueAction.addMessage(
              null,
              "success",
              "Информация о артикле изменена"
            )
          );
          setOpen(false);
        }
      )
    );
  };

  return (
    <>
      <div>
        <Dialog open={true} onClose={handleClose}>
          {false && <CircularIndeterminate />}
          <DialogTitle>Редактирование артикула {content?.title}</DialogTitle>
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
                defaultValue={form.title}
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
                defaultValue={form.description}
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
                title="Открывание (левое / правое)"
                value={form.opening_direction}
                setValue={(value) => {
                  setDisable(false);
                  setForm({
                    ...form,
                    opening_direction: value,
                  });
                }}
              />
              <br />
              <Checkbox
                title="Основной замок (Нет / Есть)"
                // @ts-ignore
                value={form.main_lock}
                setValue={(value) => {
                  setDisable(false);
                  setForm({
                    ...form,
                    main_lock: value,
                  });
                }}
              />
              <br />
              <Checkbox
                title="Дополнительный замок (Нет / Есть)"
                value={form.additional_lock}
                setValue={(value) => {
                  setDisable(false);
                  setForm({
                    ...form,
                    additional_lock: value,
                  });
                }}
              />
              <br />
              <Checkbox
                title="Наличие зеркала (Нет / Есть)"
                value={form.mirror}
                setValue={(value) => {
                  setDisable(false);
                  setForm({
                    ...form,
                    mirror: value,
                  });
                }}
              />
              <br />
              <Checkbox
                title="Без дефекта (по умолчанию - с дефектом)"
                value={form.is_defect}
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
                defaultValue={form.door_leaf_thickness}
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
                defaultValue={form.sealing_contours}
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
                defaultValue={form.color}
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
                defaultValue={form.price_without_discount}
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
                defaultValue={form.price}
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
              Изменить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default React.memo(CharacteristicEdit);
