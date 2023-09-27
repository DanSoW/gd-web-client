import React, { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
import filterMin from "src/resources/images/filter_min.svg";
import filterMax from "src/resources/images/filter_max.svg";
import Filter from "src/components/Filter";
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
import { IFilterValues } from "src/models/IFilterModel";
import ModalWindow from "src/components/ModalWindow";
import ModalWindowQuestions from "src/components/ModalWindowQuestions";
import useModal from "src/hooks/useModal";
import FilterAction from "src/store/actions/FilterAction";

interface IOrderInfo {
  door_title: string;
  article_title: string;
}

const Main: FC<any> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean | null>(null);
  const filterSelector = useAppSelector((s) => s.filterReducer);

  const handleChangeFilterValues = (target: string, value: boolean) => {
    dispatch(FilterAction.setProperty(target, value));
  };

  const handleClickReloadFilterValues = () => {
    dispatch(FilterAction.clearFilter());
  };

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
    dispatch(UserAction.doorGetAll(0, 5, filter));
  }, []);

  const onMoreClick = () => {
    dispatch(
      UserAction.doorGetAll(
        userSelector.doors?.length,
        5,
        filter ? true : null,
        !filter ? true : null,
        filterSelector,
        true
      )
    );
  };

  const onFilterClick = () => {
    setFilter(null);

    dispatch(
      UserAction.doorGetAll(
        0,
        5,
        filter ? true : null,
        !filter ? true : null,
        filterSelector
      )
    );
  };

  const { isOpen, toggle } = useModal();
  const [orderInfo, setOrderInfo] = useState<IOrderInfo>({
    door_title: "",
    article_title: "",
  });
  const selectItem = (door_title: string, article_title: string) => {
    setOrderInfo({
      door_title: door_title,
      article_title: article_title,
    });

    toggle();
  };

  return (
    <>
      <Header />
      <ModalWindow isOpen={isOpen} toggle={toggle}>
        <ModalWindowQuestions
          title="Ваш заказ"
          text="Для покупки оставьте ваши данные и мы скоро с вами свяжемся"
          type="order"
          door_title={orderInfo.door_title}
          article_title={orderInfo.article_title}
        />
      </ModalWindow>
      {!matches && (
        <Filter
          scrollHandler={scrollToFilter}
          handleChangeFilterValues={handleChangeFilterValues}
          handleClickReloadFilterValues={handleClickReloadFilterValues}
          handleClickFilter={onFilterClick}
        />
      )}
      {userSelector.isLoading && <CircularIndeterminate />}
      <div className={styles.container}>
        <div className={styles.item}>
          {!matches && (
            <Element
              name="filter"
              className={styles.control}
              onClick={() => {
                const localFilter = filter === null ? false : !filter;
                setFilter(localFilter);
                dispatch(
                  UserAction.doorGetAll(
                    0,
                    5,
                    localFilter ? true : null,
                    !localFilter ? true : null,
                    filterSelector,
                    false
                  )
                );
              }}
            >
              {(filter === null || filter) && (
                <>
                  <p className={styles.textH}>По убыванию цены</p>
                  <img src={filterMin} alt="По убыванию цены" />
                </>
              )}
              {filter !== null && !filter && (
                <>
                  <p className={styles.textH}>По возрастанию цены</p>
                  <img src={filterMax} alt="По возрастанию цены" />
                </>
              )}
            </Element>
          )}
          {matches && (
            <div
              className={styles.controlInversion}
              onClick={() => {
                const localFilter = filter === null ? false : !filter;
                setFilter(localFilter);
                dispatch(
                  UserAction.doorGetAll(
                    0,
                    5,
                    localFilter ? true : null,
                    !localFilter ? true : null,
                    filterSelector,
                    false
                  )
                );
              }}
            >
              {(filter === null || filter) && (
                <>
                  <p className={styles.textH}>По убыванию цены</p>
                  <img src={filterMin} alt="По убыванию цены" />
                </>
              )}
              {filter !== null && !filter && (
                <>
                  <p className={styles.textH}>По возрастанию цены</p>
                  <img src={filterMax} alt="По возрастанию цены" />
                </>
              )}
            </div>
          )}
        </div>
        {matches && (
          <div className={styles.item}>
            <Filter
              scrollHandler={scrollToFilter}
              showModal={showModal}
              setShowModal={setShowModal}
              handleChangeFilterValues={handleChangeFilterValues}
              handleClickReloadFilterValues={handleClickReloadFilterValues}
              handleClickFilter={onFilterClick}
            />
          </div>
        )}
        <div className={styles.item}>
          <div className={styles.doorList}>
            {!userSelector.isLoading &&
              userSelector.doors.map((item) => {
                return <DoorItem data={item} selectItem={selectItem} />;
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
