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

const Main: FC<any> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean | null>(null);
  const [filterValues, setFilterValues] = useState<IFilterValues>({
    all_sizes: null,
    size780on2000: null,
    size800on2030: null,
    size860on2050: null,
    size900on2050: null,
    size960on2070: null,
    size980on2080: null,
    size1050on2070: null,
    for_apartment: null,
    for_home: null,
    left_opening: null,
    right_opening: null,
    mirror: null,
    without_defect: null,
    outdated_model: null,
    showcase_sample: null,
  });

  const handleChangeFilterValues = (target: string, value: boolean) => {
    setFilterValues({
      ...filterValues,
      [target]: value,
    });
  };

  const handleClickReloadFilterValues = () => {
    setFilterValues({
      all_sizes: null,
      size780on2000: null,
      size800on2030: null,
      size860on2050: null,
      size900on2050: null,
      size960on2070: null,
      size980on2080: null,
      size1050on2070: null,
      for_apartment: null,
      for_home: null,
      left_opening: null,
      right_opening: null,
      mirror: null,
      without_defect: null,
      outdated_model: null,
      showcase_sample: null,
    });
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
        filterValues,
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
        filterValues
      )
    );
  };

  return (
    <>
      <Header />
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
                    filterValues,
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
                    filterValues,
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
