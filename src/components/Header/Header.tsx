import React, { FC, useEffect, useState } from "react";
import styles from './Header.module.scss';
import logo from '../../resources/images/logo1.svg'
import phoneIcon from '../../resources/images/phoneIcon.svg';
import mailIcon from '../../resources/images/phoneIcon.svg';
import phoneRectangle from '../../resources/images/phoneRectangle.svg';
import PhoneCallIcon from '../../resources/images/PhoneCallIcon.svg';
import headerSliderBackground from '../../resources/images/headerSliderBackground.png';
import headerContentIcon1 from '../../resources/images/headerIcon1.svg';
import headerContentIcon2 from '../../resources/images/headerIcon2.svg';
import headerContentIcon3 from '../../resources/images/headerIcon3.svg';
import swiperArrow from '../../resources/images/swiperArrow.svg';


const Header: FC<any> = () => {
  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <div className={styles.headerTopBlock}>
            <div className={styles.headerLogoWrapper}>
              <img src={logo} alt="" />
              <p className={styles.headerLogoTextDoor}>ДВЕРИ</p>
              <p className={styles.headerLogoTextGran}>ГРАНИТ</p>
            </div>
            <div className={styles.headerContactsWrapper}>
              <div className={styles.cintactPhone}>
                <img src={phoneIcon} alt="phoneIcon" />
                <p className={styles.contactText}>+7 (999) 999-99-99</p>
              </div>
              <div className={styles.contactMail}>
                <img src={mailIcon} alt="mailIcon" />
                <p className={styles.contactText}>info@corp.com</p>
              </div>
              <div className={styles.subApply}>
                {/* <div className={styles.phoneBlock}></div> */}
                <div className={styles.phoneCallBlock}>
                  <img src={phoneRectangle} alt="phoneBack" />
                  <img src={PhoneCallIcon} alt="phone" className={styles.phoneCallIcon} />
                </div>
                <p className={styles.sendApplytext}>Оставить заявку</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.headerMainBlock}>
          <img src={headerSliderBackground} alt="slide" />
          <div className={styles.headerContentWrapper}>
            <div className={styles.sliderLeftSide}>
              <div className="">
                <p className={styles.leftSideMainText}>
                ЛУЧШИЕ ПРЕДЛОЖЕНИЯ
                НА РЫНКЕ ДВЕРЕЙ
                </p>
                <p className={styles.leftSideBottomText}>
                от известных производителей
                </p>
              </div>
              <div className={styles.sliderBtnsBlock}>
                <div className={styles.sliderPrevBtn}>
                  <img src={swiperArrow} alt="arrow" />
                </div>
                <div className={styles.sliderNextBtn}>
                  <img src={swiperArrow} alt="arrow" />
                </div>
              </div>
            </div>
            <div className={styles.sliderRightSide}>
              <div className={styles.sliderInfoElement}>
                <img src={headerContentIcon3} alt="icon1" />
                <p>Качество сборки</p>
              </div>
              <div className={styles.sliderInfoElement}>
                <img src={headerContentIcon2} alt="icon1" />
                <p>Гарантия товара</p>
              </div>
              <div className={styles.sliderInfoElement}>
                <img src={headerContentIcon1} alt="icon1" />
                <p>Доверие клиентов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Header);