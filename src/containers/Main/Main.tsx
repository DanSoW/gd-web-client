import React, { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
import filterMin from "src/resources/images/filter_min.svg";
import Filter from "src/components/Filter";
import mockData from "./mock.data";

import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import DoorItem from "src/components/Main/DoorItem";

const Main: FC<any> = () => {
  const scrollToFilter = () => {
    scroller.scrollTo("filter", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <>
      <Filter scrollHandler={scrollToFilter} />
      <div className={styles.container}>
        <div className={styles.item}>
          <Element name="filter" className={styles.control}>
            <p className={styles.textH}>По убыванию цены</p>
            <img src={filterMin} alt="По убыванию цены" />
          </Element>
        </div>
        <div className={styles.item}>
          <div className={styles.doorList}>
            {mockData.map((item) => {
              return <DoorItem data={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Main);
