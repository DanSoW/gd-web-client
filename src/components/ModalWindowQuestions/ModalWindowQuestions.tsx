import React, { memo, useState, FC, useEffect } from "react";
import styles from "./ModalWindowQuestions.module.scss";
import phoneRectangle from "../../resources/images/phoneRectangle.svg";
import CircularIndeterminate from "../CircularIndeterminate";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { IArticleModel } from "src/models/IDoorModel";
import MailerAction from "src/store/actions/MailerAction";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useMediaQuery } from "@mui/material";

interface IMailerModal {
  email: string;
  phone: string;
  name: string;
}

const successImgDesktop = { width: "256px", height: "256px" };
const successImgMobile = { width: "128px", height: "128px" };

interface IModalWindowQuestionsProps {
  title: string;
  text: string;
  type?: "common" | "order";
  door_title?: string | null;
  article_title?: string | null;
}

const ModalWindowQuestions: FC<IModalWindowQuestionsProps> = ({
  title,
  text,
  type = "common",
  door_title = null,
  article_title = null,
}) => {
  const mailerSelector = useAppSelector((s) => s.mailerReducer);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<IMailerModal>({
    email: "",
    phone: "",
    name: "",
  });

  const changeHandler = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clickHandler = () => {
    if (type === "common") {
      dispatch(
        MailerAction.mailerCommonSend(form.name, form.email, form.phone)
      );
    } else if (type === "order" && door_title && article_title) {
      dispatch(
        MailerAction.mailerOrderSend(
          form.name,
          form.email,
          form.phone,
          door_title,
          article_title
        )
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch(MailerAction.mailerSendClear());
    };
  }, []);

  return (
    <>
      {mailerSelector.isLoading && <CircularIndeterminate />}
      {mailerSelector.isSend && (
        <div className={styles.successForm}>
          <CheckCircleOutlineIcon
            color="success"
            sx={{
              width: "68px",
              height: "68px",
            }}
          />
          <p>Вы успешно отправили форму обратной связи!</p>
          <p>В ближайшее время наш менеджер свяжется с Вами</p>
        </div>
      )}
      {!mailerSelector.isSend && (
        <form
          className={styles.modalBody}
          onSubmit={(e: any) => {
            e.preventDefault();
            clickHandler();
          }}
        >
          <div className={styles.header}>
            <p className={styles.headerTitle}>{title}</p>
            <p className={styles.headerText}>{text}</p>
          </div>
          <div className={styles.main}>
            <input
              required={true}
              type="text"
              className={styles.mainInput}
              placeholder="Ваше имя"
              name="name"
              onChange={changeHandler}
            />
            <input
              required={true}
              type="text"
              className={styles.mainInput}
              placeholder="Ваш email"
              name="email"
              onChange={changeHandler}
            />
            <input
              required={true}
              type="text"
              className={styles.mainInput}
              placeholder="Ваш телефон"
              name="phone"
              onChange={changeHandler}
            />
          </div>
          <div className={styles.footer}>
            <button className={styles.subApply}>
              <img src={phoneRectangle} alt="phoneBack" />
              <p className={styles.sendApplytext}>Оставить заявку</p>
            </button>
            <p className={styles.agreeText}>
              Нажимая кнопку «Оставить заявку», вы соглашаетесь с условиями
              обработки персональных данных
            </p>
          </div>
        </form>
      )}
    </>
  );
};

export default memo(ModalWindowQuestions);
