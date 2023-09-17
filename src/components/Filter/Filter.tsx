import { FC, memo } from "react";
import styles from "./Filter.module.css";
import setting from "src/resources/images/setting.svg";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "5px",
  width: 20,
  height: 20,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137039",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    marginTop: "1.5px",
    marginLeft: "1.9px",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#137039",
  },
});

const BpCheckbox = (props: CheckboxProps) => {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
        padding: "0px"
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

const Filter: FC<any> = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.control}>
          <img src={setting} alt="Настройки" />
          <p className={styles.textH}>Фильтр моделей</p>
        </div>
        <div className={styles.item}>
          <p className={styles.iTextH}>Размеры</p>
          <div className={styles.selectItem}>
            <BpCheckbox />
            <p className={styles.text}>Все размеры</p>
          </div>
          <div className={styles.selectItem}>
            <BpCheckbox />
            <p className={styles.text}>780х2000 мм</p>
          </div>
          <div className={styles.selectItem}>
            <BpCheckbox />
            <p className={styles.text}>800х2030 мм</p>
          </div>
          <div className={styles.selectItem}>
            <BpCheckbox />
            <p className={styles.text}>860х2050 мм</p>
          </div>
          <div className={styles.selectItem}>
            <BpCheckbox />
            <p className={styles.text}>900х2050 мм</p>
          </div>
          <div className={styles.selectItem}>
            <BpCheckbox />
            <p className={styles.text}>960х2070 мм</p>
          </div>
          <div className={styles.selectItem}>
            <BpCheckbox />
            <p className={styles.text}>980х2080 мм</p>
          </div>
          <div className={styles.selectItem}>
            <BpCheckbox />
            <p className={styles.text}>1050х2070 мм</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
