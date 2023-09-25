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

  return (
    <>
      {adminSelector.isLoading && <CircularIndeterminate />}
      <div className={styles.container}>
        <div className={styles.itemAddBtn}>
          <Button
            title="Добавить"
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
