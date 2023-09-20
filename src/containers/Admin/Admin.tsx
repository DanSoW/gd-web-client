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

const Admin: FC<any> = () => {
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

  return (
    <>
      {!matches && <Filter scrollHandler={scrollToFilter} />}
      <div className={styles.container}>
        <div className={styles.itemAddBtn}>
          <Button
            title="Добавить"
            clickHandler={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className={styles.item} style={{ marginTop: "24px" }}>
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
            {mockData.map((item) => {
              return <DoorItem data={item} />;
            })}
          </div>
          <div className={styles.doorBtn}>
            <Button
              title="Загрузить ещё"
              clickHandler={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Admin);
