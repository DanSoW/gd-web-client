import { FC, memo } from "react";
import styles from "./Footer.module.scss";
import footerLogo from "../../resources/images/footerLogo.svg";
import footerCallRectangle from "../../resources/images/footerCallRectangle.svg";
import PhoneCallIcon from "../../resources/images/PhoneCallIcon.svg";
import footerGeoIcon from "../../resources/images/footerGeoIcon.svg";
import footerPhoneIcon from "../../resources/images/footerPhoneIcon.svg";
import footerMailIcon from "../../resources/images/footerMailIcon.svg";

import ModalWindow from "../ModalWindow/ModalWindow";
import useModal from "../../hooks/useModal";

import ModalWindowQuestions from "../ModalWindowQuestions";
import CircularIndeterminate from "../CircularIndeterminate";

const Footer: FC<any> = () => {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <div className={styles.footerWrapper}>
        <div className={styles.footer}>
          <div className={styles.logoBlock}>
            <div className={styles.logoWrapper}>
              <img src={footerLogo} alt="logo" />
              <p className={styles.logoText}>ДВЕРИ ГРАНИТ</p>
            </div>
            <p className={styles.sertInfo}>Зарегистрированный товарный знак</p>
          </div>

          <div className={styles.footerContactsWrapper}>
            <div className={styles.contactGeo}>
              <img src={footerGeoIcon} alt="phoneIcon" />
              <a
                href="https://2gis.ru/spb/firm/70000001048507712/tab/inside?m=30.395621%2C60.062281%2F16"
                className={styles.contactText}
              >
                Шоссейная улица, 1АБ, пос. Бугры, Ленинградская обл.
              </a>
            </div>
            <div className={styles.cintactPhone}>
              <img src={footerPhoneIcon} alt="phoneIcon" />
              <p className={styles.contactText}>+7 (995) 155-43-27</p>
            </div>
            <div className={styles.contactMail}>
              <img src={footerMailIcon} alt="mailIcon" />
              <p className={styles.contactText}>info@corp.com</p>
            </div>
            <div className={styles.subApply} onClick={toggle}>
              {/* <div className={styles.phoneBlock}></div> */}
              <div className={styles.phoneCallBlock}>
                <img src={footerCallRectangle} alt="phoneBack" />
                <img
                  src={PhoneCallIcon}
                  alt="phone"
                  className={styles.phoneCallIcon}
                />
              </div>
              <p className={styles.sendApplytext}>Оставить заявку</p>
            </div>
          </div>
        </div>
      </div>
      <ModalWindow isOpen={isOpen} toggle={toggle}>
        <ModalWindowQuestions
          title="Остались вопросы?"
          text="Мы свяжемся с вами, чтобы подробно обсудить заказ и рассчитать стоимость"
        />
      </ModalWindow>
    </>
  );
};

export default memo(Footer);
