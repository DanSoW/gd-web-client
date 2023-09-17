import React, { FC, useEffect, useState } from "react";
import styles from "./Main.module.scss";
import filterMin from "src/resources/images/filter_min.svg";
import Filter from "src/components/Filter";

const Main: FC<any> = () => {
  return (
    <>
      <Filter />
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.control}>
            <p className={styles.textH}>По убыванию цены</p>
            <img src={filterMin} alt="По убыванию цены" />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Main);
