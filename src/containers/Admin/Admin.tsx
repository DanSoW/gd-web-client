import React, { FC, useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import filterMin from "src/resources/images/filter_min.svg";
import Filter from "src/components/Filter";
import mockData from "./mock.data";
import { useMediaQuery } from "@mui/material";

import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import DoorItem from "src/components/Admin/DoorItem";
import Button from "src/components/UI/Button";
import { IDoorValues } from "src/models/IDoorModel";
import DoorAdd from "src/components/Admin/DoorAdd";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import AdminAction from "src/store/actions/AdminAction";
import messageQueueAction from "src/store/actions/MessageQueueAction";
import CircularIndeterminate from "src/components/CircularIndeterminate";
import ImageUpload from "src/components/ImageUpload";
import FilterInfoAction from "src/store/actions/FilterInfoAction";

const Admin: FC<any> = () => {
  const adminSelector = useAppSelector((s) => s.adminReducer);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const matches = useMediaQuery(
    "only screen and (min-width: 300px) and (max-width: 1280px)"
  );

  const [doorAdd, setDoorAdd] = useState<boolean>(false);
  const doorAddHandler = (
    values: IDoorValues,
    imageEntry: Array<{ data_url: string; file?: File }>,
    imageExit: Array<{ data_url: string; file?: File }>
  ) => {
    dispatch(
      // @ts-ignore
      AdminAction.doorAdd(values, imageEntry, imageExit, () => {
        dispatch(
          messageQueueAction.addMessage(
            null,
            "success",
            "Новая дверь успешно добавлена!"
          )
        );
        dispatch(AdminAction.doorGetAll());
        setDoorAdd(false);
      })
    );
  };

  const scrollToFilter = () => {
    scroller.scrollTo("filter", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  useEffect(() => {
    dispatch(AdminAction.doorGetAll());
  }, []);

  const filterInfoSelector = useAppSelector((s) => s.filterInfoReducer);
  const [image, setImage] = React.useState<
    Array<{ data_url: string; file?: File }>
  >([
    {
      data_url: filterInfoSelector.url,
    },
  ]);

  // @ts-ignore
  const onChangeImage = async (imageList, addUpdateIndex) => {
    setImage(imageList);
    if (imageList.length > 0 && imageList[0].file) {
      dispatch(FilterInfoAction.filterInfoAdd(imageList));
    }
  };

  useEffect(() => {
    dispatch(FilterInfoAction.getFilterInfo());
  }, []);

  useEffect(() => {
    if (filterInfoSelector.url.length > 0) {
      setImage([{ data_url: filterInfoSelector.url }]);
    }
  }, [filterInfoSelector.url]);

  return (
    <>
      {adminSelector.isLoading && <CircularIndeterminate />}
      <div className={styles.container}>
        <div className={styles.item}>
          <ImageUpload
            title={"Подсказка для размеров *"}
            subtitle={"Загрузить изображение"}
            value={image}
            onChange={onChangeImage}
            multiple={false}
          />
        </div>
        <div className={styles.itemAddBtn}>
          <Button
            title="Добавить дверь"
            clickHandler={() => {
              setDoorAdd(true);
            }}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.doorList}>
            {adminSelector.doors.map((item) => {
              return <DoorItem key={item.id} data={item} />;
            })}
          </div>
        </div>
      </div>
      <DoorAdd
        open={doorAdd}
        setOpen={setDoorAdd}
        addHandler={doorAddHandler}
      />
    </>
  );
};

export default React.memo(Admin);
