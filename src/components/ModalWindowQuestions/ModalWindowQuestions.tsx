import React, { memo } from "react";
import styles from './ModalWindowQuestions.module.scss'
import phoneRectangle from '../../resources/images/phoneRectangle.svg';


interface ModalText {
    title: string;
    text: string;
};

const ModalWindowQuestions = (props: ModalText) => {
    return (
        <>
        <div className={styles.modalBody}>
            <div className={styles.header}>
                <p className={styles.headerTitle}>
                    {props.title}
                </p>
                <p className={styles.headerText}>
                    {props.text}
                </p>
            </div>
            <div className={styles.main}>
                <input type="text" className={styles.mainInput} placeholder="Ваше имя" />
                <input type="text" className={styles.mainInput} placeholder="Ваш телефон" />
            </div>
            <div className={styles.footer}>
                <div className={styles.subApply}>
                  <div className={styles.phoneCallBlock}>
                    <img src={phoneRectangle} alt="phoneBack" />
                  </div>
                  <p className={styles.sendApplytext}>Оставить заявку</p>
                </div>
                <p className={styles.agreeText}>
                Нажимая кнопку «Оставить заявку»,
вы соглашаетесь с условиями обработки персональных данных
                </p>
            </div>
        </div>
        </>
    )
}

export default memo(ModalWindowQuestions);