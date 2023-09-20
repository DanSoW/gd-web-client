import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { FC, memo, useState } from "react";
import styles from "./Checkbox.module.scss";

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
    width: "16px",
    height: "16px",
    marginTop: "1.7px",
    marginLeft: "1.9px",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M10.9697 4.96999C11.1105 4.83588 11.298 4.76173 11.4925 4.76321C11.687 4.76468 11.8733 4.84165 12.0121 4.97787C12.1509 5.1141 12.2314 5.29893 12.2366 5.49336C12.2417 5.68779 12.1711 5.87661 12.0397 6.01999L8.04967 11.01C7.98106 11.0839 7.89825 11.1432 7.8062 11.1844C7.71415 11.2255 7.61474 11.2477 7.51392 11.2496C7.4131 11.2514 7.31294 11.2329 7.21943 11.1952C7.12591 11.1575 7.04097 11.1013 6.96967 11.03L4.32367 8.38399C4.24998 8.31532 4.19088 8.23252 4.14989 8.14052C4.1089 8.04853 4.08685 7.94921 4.08508 7.84851C4.0833 7.74781 4.10183 7.64778 4.13955 7.55439C4.17727 7.461 4.23341 7.37617 4.30463 7.30495C4.37585 7.23373 4.46068 7.17758 4.55407 7.13986C4.64746 7.10214 4.74749 7.08362 4.84819 7.08539C4.94889 7.08717 5.04821 7.10921 5.14021 7.15021C5.23221 7.1912 5.31501 7.2503 5.38367 7.32399L7.47767 9.41699L10.9507 4.99199C10.9569 4.98429 10.9626 4.97694 10.9697 4.96999Z' fill='white'/%3E%3C/svg%3E\")",
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
        padding: "0px",
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
};

export interface ICustomCheckboxProps {
  value: boolean;
  setValue: (value: boolean) => void;
  title: string;
}

const CustomCheckbox: FC<ICustomCheckboxProps> = ({
  title,
  value,
  setValue,
}) => {
  const onChange = () => {
    setValue(!value);
  };

  return (
    <div className={styles.selectItem}>
      {value && <BpCheckbox checked={true} onClick={onChange} />}
      {!value && <BpCheckbox checked={false} onClick={onChange} />}
      <p className={styles.text} onClick={onChange}>
        {title}
      </p>
    </div>
  );
};

export default memo(CustomCheckbox);
