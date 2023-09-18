import React, { FC } from "react";
import styles from './Header.module.scss';
import logo from '../../resources/images/logo1.svg'
import phoneIcon from '../../resources/images/phoneIcon.svg';
import mailIcon from '../../resources/images/mailIcon.svg';
import phoneRectangle from '../../resources/images/phoneRectangle.svg';
import PhoneCallIcon from '../../resources/images/PhoneCallIcon.svg';
// import headerSliderBackground from '../../resources/images/headerSliderBackground.png';
import headerContentIcon1 from '../../resources/images/headerIcon1.svg';
import headerContentIcon2 from '../../resources/images/headerIcon2.svg';
import headerContentIcon3 from '../../resources/images/headerIcon3.svg';
import swiperArrow from '../../resources/images/swiperArrow.svg';
import headerFullSlide from '../../resources/images/headerFullSlide.png';
import classNames from "classnames";

import ModalWindow from "../ModalWindow/ModalWindow";
import useModal from "../../hooks/useModal";

import ModalWindowQuestions from "../ModalWindowQuestions";

import "./swiper.duplicate.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const Header: FC<any> = () => {

  const { isOpen, toggle } = useModal();

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <div className={styles.headerTopBlock}>
            <div className={styles.headerLogoWrapper}>
              <img src={logo} alt="" />
              <div className="">
                <p className={styles.headerLogoTextDoor}>ДВЕРИ</p>
                <p className={styles.headerLogoTextGran}>ГРАНИТ</p>
              </div>
            </div>
            <div className={styles.headerContactsWrapper}>
              <div className={styles.cintactPhone}>
                <img src={phoneIcon} alt="phoneIcon" />
                <p className={styles.contactText}>+7 (999) 999-99-99</p>
              </div>

              <div className={styles.headerMobileWrapBlock}>
                <div className={styles.contactMail}>
                  <img src={mailIcon} alt="mailIcon" />
                  <p className={styles.contactText}>info@corp.com</p>
                </div>
                <div className={styles.subApply} onClick={toggle}>
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
        </div>
        <div className={styles.headerMainBlock}>
          <Swiper
                    modules={[Navigation]}
                    className={styles.customSwiper}
                    slidesPerView={1}
                    spaceBetween={200}
                    speed={500}
                    navigation={{
                        prevEl: '#btn_prev',
                        nextEl: '#btn_next'
                    }}
          >
            {/* <div className="swiper-wrapper" style={{display: 'flex'}}> */}
              <SwiperSlide className={styles.customSlide}>
                <div className={styles.headerSlideFull} style={{backgroundImage: `url(${headerFullSlide})`}}>

                </div>
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
                    {/* <div className={styles.sliderBtnsBlock}>
                      <div className={styles.sliderPrevBtn}>
                        <img src={swiperArrow} alt="arrow" />
                      </div>
                      <div className={styles.sliderNextBtn}>
                        <img src={swiperArrow} alt="arrow" />
                      </div>
                    </div> */}
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
              </SwiperSlide>
                

              <SwiperSlide>
                <div className={styles.headerSlideFull} style={{backgroundImage: `url(${headerFullSlide})`}}>

                </div>
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
                    {/* <div className={styles.sliderBtnsBlock}>
                      <div className={styles.sliderPrevBtn}>
                        <img src={swiperArrow} alt="arrow" />
                      </div>
                      <div className={styles.sliderNextBtn}>
                        <img src={swiperArrow} alt="arrow" />
                      </div>
                    </div> */}
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
              </SwiperSlide>
            {/* </div> */}
          </Swiper>
                    <div className={styles.sliderBtnsBlock}>
                      <div className={classNames('swiperButtonPrev', styles.sliderPrevBtn)} id="btn_prev">
                        <img src={swiperArrow} alt="arrow" />
                      </div>
                      <div className={classNames('swiperButtonNext', styles.sliderNextBtn)} id="btn_next">
                        <img src={swiperArrow} alt="arrow" />
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

export default React.memo(Header);