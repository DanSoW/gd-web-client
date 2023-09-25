import { FC, memo, useState, useEffect, useRef } from "react";
import styles from "./Filter.module.css";
import setting from "src/resources/images/setting.svg";
import settingWhite from "src/resources/images/setting_white.svg";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "../UI/Button";
import CircularIndeterminate from "../CircularIndeterminate";
import useMediaQuery from "@mui/material/useMediaQuery";
import questionSize from "src/resources/images/question_size.svg";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: "58px",
  height: "33px",
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 3,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#137039" : "#137039",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: "27px",
    height: "27px",
  },
  "& .MuiSwitch-track": {
    borderRadius: "23px",
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

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
  title: string;
  clickHandler?: (value: boolean) => void;
}

const CustomCheckbox: FC<ICustomCheckboxProps> = ({
  title,
  clickHandler = (_) => {},
}) => {
  const [value, setValue] = useState<boolean>(false);

  const onChange = () => {
    const res = !value;
    setValue(res);
    clickHandler(res);
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

export interface ICustomSwitchProps {
  title: string;
  clickHandler?: (value: boolean) => void;
}

const CustomSwitch: FC<ICustomSwitchProps> = ({
  title,
  clickHandler = (value) => {},
}) => {
  const [value, setValue] = useState<boolean>(false);

  const onChange = (e: any) => {
    setValue(e.target.checked);
    clickHandler(e.target.checked);
  };

  return (
    <div className={styles.selectItemSwitch}>
      <p className={styles.text}>{title}</p>
      <IOSSwitch onClick={onChange} />
    </div>
  );
};

export interface IFilterProps {
  showModal?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  scrollHandler: () => void;
  handleChangeFilterValues: (target: string, value: boolean) => void;
  handleClickReloadFilterValues: () => void;
  handleClickFilter: () => void;
}

const Filter: FC<IFilterProps> = ({
  scrollHandler,
  showModal,
  setShowModal,
  handleChangeFilterValues,
  handleClickReloadFilterValues,
  handleClickFilter,
}) => {
  const matches = useMediaQuery("(max-width: 1280px)");
  const [visible, setVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const clickHandler = () => {
    handleClickFilter();
  };

  const targetRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Если элемент становится невидимым
        if (!entry.isIntersecting) {
          setVisible(false);
        } else {
          // Если компонент перестал быть видим
          setVisible(true);
        }
      });
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Отписка от наблюдения при размонтировании компонента
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [matches]);

  const modalHandler = () => {
    if (setShowModal) {
      setShowModal(!showModal);
    }
  };

  return (
    <>
      {loading && <CircularIndeterminate />}
      {!matches && (
        <div ref={targetRef} className={styles.container}>
          <div className={styles.control}>
            <img src={setting} alt="Настройки" />
            <p className={styles.textH}>Фильтр моделей</p>
          </div>
          <div className={styles.item}>
            <div className={styles.itemSize}>
              <p className={styles.iTextH}>Размеры</p>
              <img src={questionSize} alt="размеры" />
            </div>
            <CustomCheckbox
              title="Все размеры"
              clickHandler={(value) => {
                handleChangeFilterValues("all_sizes", value);
              }}
            />
            <CustomCheckbox
              title="780х2000 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size780on2000", value);
              }}
            />
            <CustomCheckbox
              title="800х2030 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size800on2030", value);
              }}
            />
            <CustomCheckbox
              title="860х2050 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size860on2050", value);
              }}
            />
            <CustomCheckbox
              title="900х2050 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size900on2050", value);
              }}
            />
            <CustomCheckbox
              title="960х2070 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size960on2070", value);
              }}
            />
            <CustomCheckbox
              title="980х2080 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size980on2080", value);
              }}
            />
            <CustomCheckbox
              title="1050х2070 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size1050on2070", value);
              }}
            />
          </div>
          <div className={styles.item} style={{ marginTop: "15px" }}>
            <p className={styles.iTextH}>Назначение двери</p>
            <CustomCheckbox
              title="Квартирная"
              clickHandler={(value) => {
                handleChangeFilterValues("for_apartment", value);
              }}
            />
            <CustomCheckbox
              title="Для дома и дачи"
              clickHandler={(value) => {
                handleChangeFilterValues("for_home", value);
              }}
            />
          </div>
          <div className={styles.item} style={{ marginTop: "15px" }}>
            <p className={styles.iTextH}>Открывание двери</p>
            <CustomCheckbox
              title="Левое открывание"
              clickHandler={(value) => {
                handleChangeFilterValues("left_opening", value);
              }}
            />
            <CustomCheckbox
              title="Правое открывание"
              clickHandler={(value) => {
                handleChangeFilterValues("right_opening", value);
              }}
            />
          </div>
          <div className={styles.item} style={{ marginTop: "15px" }}>
            <CustomSwitch
              title="С зеркалом"
              clickHandler={(value) => {
                handleChangeFilterValues("mirror", value);
              }}
            />
            <CustomSwitch
              title="Без дефекта"
              clickHandler={(value) => {
                handleChangeFilterValues("without_defect", value);
              }}
            />
          </div>
          <div className={styles.item} style={{ marginTop: "15px" }}>
            <p className={styles.iTextH}>Дополнительные особенности</p>
            <CustomCheckbox
              title="Витринный образец"
              clickHandler={(value) => {
                handleChangeFilterValues("showcase_sample", value);
              }}
            />
            <CustomCheckbox
              title="Устаревшая модель"
              clickHandler={(value) => {
                handleChangeFilterValues("outdated_model", value);
              }}
            />
          </div>
          <div className={styles.item}>
            <Button clickHandler={clickHandler} title="Фильтровать" />
            <p
              className={styles.default}
              onClick={handleClickReloadFilterValues}
            >
              Сбросить
            </p>
          </div>
        </div>
      )}
      {!visible && !matches && (
        <button className={styles.fixedButton} onClick={scrollHandler}>
          <img src={settingWhite} alt="Настройки" />
          Фильтр моделей
        </button>
      )}
      {matches && !showModal && (
        <button className={styles.adaptiveButton} onClick={modalHandler}>
          <img src={settingWhite} alt="Настройки" />
          Фильтр моделей
        </button>
      )}
      {matches && showModal && (
        <div className={styles.containerModal}>
          <button className={styles.adaptiveButton} onClick={modalHandler}>
            <img src={settingWhite} alt="Настройки" />
            Фильтр моделей
          </button>
          <div className={styles.item}>
            <div className={styles.itemSize}>
              <p className={styles.iTextH}>Размеры</p>
              <img src={questionSize} alt="размеры" />
            </div>
            <CustomCheckbox
              title="Все размеры"
              clickHandler={(value) => {
                handleChangeFilterValues("all_sizes", value);
              }}
            />
            <CustomCheckbox
              title="780х2000 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size780on2000", value);
              }}
            />
            <CustomCheckbox
              title="800х2030 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size800on2030", value);
              }}
            />
            <CustomCheckbox
              title="860х2050 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size860on2050", value);
              }}
            />
            <CustomCheckbox
              title="900х2050 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size900on2050", value);
              }}
            />
            <CustomCheckbox
              title="960х2070 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size960on2070", value);
              }}
            />
            <CustomCheckbox
              title="980х2080 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size980on2080", value);
              }}
            />
            <CustomCheckbox
              title="1050х2070 мм"
              clickHandler={(value) => {
                handleChangeFilterValues("size1050on2070", value);
              }}
            />
          </div>
          <div className={styles.item} style={{ marginTop: "15px" }}>
            <p className={styles.iTextH}>Назначение двери</p>
            <CustomCheckbox
              title="Квартирная"
              clickHandler={(value) => {
                handleChangeFilterValues("for_apartment", value);
              }}
            />
            <CustomCheckbox
              title="Для дома и дачи"
              clickHandler={(value) => {
                handleChangeFilterValues("for_home", value);
              }}
            />
          </div>
          <div className={styles.item} style={{ marginTop: "15px" }}>
            <p className={styles.iTextH}>Открывание двери</p>
            <CustomCheckbox
              title="Левое открывание"
              clickHandler={(value) => {
                handleChangeFilterValues("left_opening", value);
              }}
            />
            <CustomCheckbox
              title="Правое открывание"
              clickHandler={(value) => {
                handleChangeFilterValues("right_opening", value);
              }}
            />
          </div>
          <div className={styles.item} style={{ marginTop: "15px" }}>
            <CustomSwitch
              title="С зеркалом"
              clickHandler={(value) => {
                handleChangeFilterValues("mirror", value);
              }}
            />
            <CustomSwitch
              title="Без дефекта"
              clickHandler={(value) => {
                handleChangeFilterValues("without_defect", value);
              }}
            />
          </div>
          <div className={styles.item} style={{ marginTop: "15px" }}>
            <p className={styles.iTextH}>Дополнительные особенности</p>
            <CustomCheckbox
              title="Витринный образец"
              clickHandler={(value) => {
                handleChangeFilterValues("showcase_sample", value);
              }}
            />
            <CustomCheckbox
              title="Устаревшая модель"
              clickHandler={(value) => {
                handleChangeFilterValues("outdated_model", value);
              }}
            />
          </div>
          <div className={styles.itemFilter}>
            <Button
              clickHandler={() => {
                clickHandler();
                if (setShowModal) {
                  setShowModal(false);
                }
              }}
              title="Фильтровать"
            />
            <p
              className={styles.default}
              onClick={handleClickReloadFilterValues}
            >
              Сбросить
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
