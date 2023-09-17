import { FC, memo } from "react";
import styles from "./Button.module.css";
import btnIcon from "src/resources/images/btnIcon.svg";

export interface IButtonProps {
  title: string;
  clickHandler: () => void;
}

const Button: FC<IButtonProps> = ({ title, clickHandler }) => {
  return (
    <>
      <button className={styles.btn} onClick={clickHandler}>
        <img src={btnIcon} />
        {title}
      </button>
    </>
  );
};

export default memo(Button);
