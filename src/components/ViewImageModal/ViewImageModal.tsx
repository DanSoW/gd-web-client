import { FC, memo, useEffect, useRef, useState } from "react";
import styles from "./ViewImageModal.module.scss";
import { IArticleModel, IImageModel } from "src/models/IDoorModel";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import close1 from "src/resources/images/close1.svg";
import { useMediaQuery } from "@mui/material";

export interface IViewImageModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  article?: IArticleModel | null;
  thumbs?: boolean;
  images?: Array<IImageModel>;
  articleView?: boolean;
}

const ViewImageModal: FC<IViewImageModalProps> = ({
  show,
  setShow,
  article = null,
  articleView = true,
  images = null,
  thumbs = true,
}) => {
  const matches = useMediaQuery(
    "only screen and (min-width: 300px) and (max-width: 500px)"
  );
  const [image, setImage] = useState<number>(0);
  const swiperRef1 = useRef(null);
  const swiperRef2 = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleSlideClick = (slideId: number) => {
    setImage(slideId);

    if (swiperRef1 && swiperRef1.current) {
      // @ts-ignore
      swiperRef1.current.swiper.slideTo(slideId);
    }
  };

  return (
    <>
      {show && (
        <div className={styles.container}>
          {!matches && (
            <div className={styles.content}>
              <img
                className={styles.closeBtn}
                src={close1}
                alt="close"
                onClick={() => {
                  setShow(false);
                }}
              />
              {articleView && (
                <div className={styles.articleLabel}>
                  {article?.title || ""}
                </div>
              )}
              <Swiper
                ref={swiperRef1}
                style={{
                  // @ts-ignore
                  "--swiper-navigation-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles.imageSwiper}
              >
                {article &&
                  article.images.map((item) => {
                    return (
                      <SwiperSlide className={styles.slide}>
                        <img src={item.url} />
                      </SwiperSlide>
                    );
                  })}
                {images &&
                  images.map((item) => {
                    return (
                      <SwiperSlide className={styles.slide}>
                        <img src={item.url} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
              {thumbs && (
                <Swiper
                  ref={swiperRef2}
                  slidesPerView={3}
                  spaceBetween={"20px"}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className={styles.thumbsSwiper}
                >
                  {article &&
                    article.images.map((item, index) => {
                      return (
                        <SwiperSlide
                          className={styles.slide}
                          onClick={() => handleSlideClick(index)}
                        >
                          <img src={item.url} />
                        </SwiperSlide>
                      );
                    })}
                  {images &&
                    images.map((item, index) => {
                      return (
                        <SwiperSlide
                          className={styles.slide}
                          onClick={() => handleSlideClick(index)}
                        >
                          <img src={item.url} />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              )}
            </div>
          )}
          {matches && (
            <div className={styles.contentAdaptive}>
              <img
                className={styles.closeBtn}
                src={close1}
                alt="close"
                onClick={() => {
                  setShow(false);
                }}
              />
              {articleView && (
                <div className={styles.articleLabel}>
                  {article?.title || ""}
                </div>
              )}
              <Swiper
                spaceBetween={25}
                pagination={true}
                navigation={true}
                style={{
                  // @ts-ignore
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                modules={[Pagination, Navigation]}
                className={styles.imageSwiper}
                slidesPerView={1}
              >
                {article &&
                  article.images.map((item) => {
                    return (
                      <SwiperSlide className={styles.slide}>
                        <img src={item.url} />
                      </SwiperSlide>
                    );
                  })}
                {images &&
                  images.map((item) => {
                    return (
                      <SwiperSlide className={styles.slide}>
                        <img src={item.url} />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default memo(ViewImageModal);
