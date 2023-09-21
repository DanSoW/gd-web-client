import React, { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
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
import DoorItem from "src/components/Main/DoorItem";
import Button from "src/components/UI/Button";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import UserAction from "src/store/actions/UserAction";
import CircularIndeterminate from "src/components/CircularIndeterminate";

const Main: FC<any> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const matches = useMediaQuery(
    "only screen and (min-width: 300px) and (max-width: 1280px)"
  );
  const scrollToFilter = () => {
    scroller.scrollTo("filter", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const userSelector = useAppSelector((s) => s.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserAction.doorGetAll(0, 5));
  }, []);

  const onMoreClick = () => {
    dispatch(UserAction.doorGetAll(userSelector.doors?.length, 5, true));
  };

  return (
    <>
      <Header />
      {!matches && <Filter scrollHandler={scrollToFilter} />}
      {userSelector.isLoading && <CircularIndeterminate />}
      <div className={styles.container}>
        <div className={styles.item}>
          {!matches && (
            <Element name="filter" className={styles.control}>
              <p className={styles.textH}>По убыванию цены</p>
              <img src={filterMin} alt="По убыванию цены" />
            </Element>
          )}
          {matches && (
            <div className={styles.controlInversion}>
              <img src={filterMin} alt="По убыванию цены" />
              <p className={styles.textH}>По убыванию цены</p>
            </div>
          )}
        </div>
        {matches && (
          <div className={styles.item}>
            <Filter
              scrollHandler={scrollToFilter}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        )}
        <div className={styles.item}>
          <div className={styles.doorList}>
            {userSelector.doors.map((item) => {
              return <DoorItem data={item} />;
            })}
          </div>
          <div className={styles.doorBtn}>
            <Button title="Загрузить ещё" clickHandler={onMoreClick} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(Main);
