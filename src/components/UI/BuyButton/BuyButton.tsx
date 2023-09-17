import { FC, memo } from "react";
import styles from "./BuyButton.module.scss";
import btnIcon from "src/resources/images/btnIcon.svg";
import buyIcon from "src/resources/images/buy_icon.svg";

export interface IBuyButtonProps {
  title: string;
  clickHandler: () => void;
}

const BuyButton: FC<IBuyButtonProps> = ({ title, clickHandler }) => {
  return (
    <>
      <button className={styles.btn} onClick={clickHandler}>
        <img src={btnIcon} />
        <img className={styles.buyIcon} src={buyIcon} />
        {title}
      </button>
    </>
  );
};

export default memo(BuyButton);
