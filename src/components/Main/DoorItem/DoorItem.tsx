import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import styles from "./DoorItem.module.css";
import { IArticleModel, IDoorModel } from "src/models/IDoorModel";
import door from "src/resources/images/door.svg";
import size from "src/resources/images/size.svg";
import discount from "src/resources/images/discount.svg";
import greenPoint from "src/resources/images/green_point.svg";
import BuyButton from "src/components/UI/BuyButton";
import { useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import ViewImageModal from "src/components/ViewImageModal";
import ModalWindow from "src/components/ModalWindow";
import ModalWindowQuestions from "src/components/ModalWindowQuestions";
import useModal from "src/hooks/useModal";
import { useAppDispatch } from "src/hooks/redux.hook";
import messageQueueAction from "src/store/actions/MessageQueueAction";
import React from "react";

interface ItemProps {
  children: [React.ReactNode, React.ReactNode];
  targetValue?: number;
}

const Item2: React.FC<ItemProps> = ({
  children,
  targetValue = 4,
}) => {
  const [p1, p2] = children;
  /*const dotsRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (p1Ref.current && p2Ref.current && dotsRef.current && itemRef.current) {
      dotsRef.current.innerText = '';

      while ((p1Ref.current.offsetWidth + p2Ref.current.offsetWidth + dotsRef.current.offsetWidth) < (itemRef.current.offsetWidth - targetValue)) {
        dotsRef.current.innerText = `${dotsRef.current.innerText}.`;
      }
    }
  }, [children, ready]);

  useEffect(() => {
    if (!ready) {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      setTimeout(() => {
        if (p1Ref.current && p2Ref.current && dotsRef.current && itemRef.current) {
          dotsRef.current.innerText = '';

          while ((p1Ref.current.offsetWidth + p2Ref.current.offsetWidth + dotsRef.current.offsetWidth) < (itemRef.current.offsetWidth - targetValue)) {
            dotsRef.current.innerText = `${dotsRef.current.innerText}.`;
          }
        }
      }, 2000);
    }
  }, [ready]);*/

  return (
    <>
      <div className={styles.item}>
        <p>{p1}</p>
        <div className={styles.dotted}></div>
        <p>{p2}</p>
        
        {
          /*
           <p ref={p1Ref}>{p1}</p>
        <div className={styles.dotted} ref={dotsRef}></div>
        <p ref={p2Ref}>{p2}</p>
          */
        }
      </div>
    </>
  );
};

const Item = React.memo(Item2);

export interface IDoorItemProps {
  data: IDoorModel;
  selectItem: (door_title: string, article_title: string) => void;
}

const DoorItem: FC<IDoorItemProps> = ({ data, selectItem }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery(
    "only screen and (min-width: 300px) and (max-width: 1170px)"
  );
  const [activeId, setActiveId] = useState<number>(data.articles[0].id);
  const [article, setArticle] = useState<IArticleModel | null>(
    data.articles.find((item) => item.id === activeId) || null
  );
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToElement = (element: HTMLElement | null) => {
    if (containerRef.current && element) {
      containerRef.current.scrollTo({
        left: element.offsetLeft - offsetLeft,
        behavior: "smooth",
      });
    }
  };

  const articleClickHandler = (item: IArticleModel) => {
    setActiveId(item.id);
    const findArticle = data.articles.find((item2) => item2.id === item.id);
    const index = data.articles.findIndex((item2) => item2.id === item.id);
    if (findArticle) {
      setArticle(findArticle);
    }

    if (matches && index >= 0 && swiperRef && swiperRef.current) {
      // @ts-ignore
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleSlideChange = (swiper: any) => {
    const art = data.articles[swiper.activeIndex];
    setActiveId(art.id);
    if (art) {
      setArticle(art);
      scrollToElement(
        document.getElementById(`article-item-${data.id}-${art.id}`)
      );
    }
  };

  useEffect(() => {
    if (containerRef.current && containerRef.current.firstChild) {
      // @ts-ignore
      const firstDivOffsetLeft = containerRef.current.firstChild.offsetLeft;
      setOffsetLeft(firstDivOffsetLeft);
    }
  }, [containerRef, windowSize]);

  const [show, setShow] = useState<boolean>(false);
  const showImageHandler = () => {
    setShow(true);
  };

  const [showDoor, setShowDoor] = useState<boolean>(false);
  const showDoorHandler = () => {
    setShowDoor(true);
  };

  const dispatch = useAppDispatch();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <p className={styles.h}>{data.title}</p>
          <div className={styles.doors}>
            <img
              src={data.image_entry}
              alt="передняя сторона"
              onClick={showDoorHandler}
            />
            <img
              src={data.image_exit}
              alt="обратная стороная"
              onClick={showDoorHandler}
            />
          </div>
          <p className={styles.description}>{data.description.slice(0, 256)}</p>
        </div>
        <div className={styles.articles} ref={containerRef}>
          {data.articles.map((item) => {
            return (
              <div
                id={`article-item-${data.id}-${item.id}`}
                className={
                  item.id === activeId ? styles.activeArticle : styles.article
                }
                onClick={() => {
                  articleClickHandler(item);
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>
        {article && !matches && (
          <div className={styles.characteristic}>
            <p className={styles.title}>Характеристика</p>
            <div className={styles.property}>
              <div className={styles.item}>
                <img src={size} alt="размер" />
                <span className={styles.size}>
                  {article.width} x {article.height} мм
                </span>
              </div>
              <div className={styles.item}>
                <img src={door} alt="открывание" />
                <span className={styles.size}>
                  {article.opening_direction
                    ? "Правое открывание"
                    : "Левое открывание"}
                </span>
              </div>
            </div>
            <div className={styles.info}>
              <Item
                children={[
                  <p>Основной замок:&nbsp;</p>,
                  <p>&nbsp;{article.main_lock ? "Есть" : "Нет"}</p>,
                ]}
              />
              <Item
                children={[
                  <p>Дополнительный замок:&nbsp;</p>,
                  <p>&nbsp;{article.additional_lock ? "Есть" : "Есть"}</p>,
                ]}
              />
              {
                /*
                <Item
                children={[
                  <p>Толщина дверного полотна:</p>,
                  <p>{`${article.door_leaf_thickness} мм`}</p>,
                ]}
              />
                */
              }
              <Item
                children={[
                  <p>Количество контуров уплотнения:&nbsp;</p>,
                  <p>&nbsp;{`${article.sealing_contours}`}</p>,
                ]}
              />
              <Item
                children={[
                  <p>Цвет покраски:&nbsp;</p>,
                  <p>&nbsp;{`${article.color}`}</p>
                ]}
              />
              <Item
                children={[
                  <p>Назначение двери:&nbsp;</p>,
                  <p>&nbsp;{`${article.target}`}</p>,
                ]}
              />
              <Item
                children={[
                  <p>Наличие зеркала:&nbsp;</p>,
                  <p>&nbsp;{article.mirror ? "Есть" : "Нет"}</p>,
                ]}
              />
              <Item
                children={[
                  <p>Особенности:&nbsp;</p>,
                  <p>&nbsp;{article.additional_features}</p>,
                ]}
              />
              <Item
                children={[
                  <p>Наличие дефектов:&nbsp;</p>,
                  <p>&nbsp;{article.is_defect ? "Есть" : "Нет"}</p>,
                ]}
              />
            </div>
            <button className={styles.viewPhotoBtn} onClick={showImageHandler}>
              Посмотреть фото
            </button>
            <p className={styles.description}>{article.description.slice(0, 256)}</p>
          </div>
        )}
        {article && !matches && (
          <div className={styles.prices}>
            <div className={styles.discountBlock}>
              <p className={styles.price}>{article.price.toLocaleString()} ₽</p>
              <div className={styles.discount}>
                <p>-{article.discount}%</p>
              </div>
            </div>
            <div className={styles.withoutDiscountBlock}>
              <p>
                <s>{article.price_without_discount.toLocaleString()} ₽</s>
              </p>
              <p></p>
            </div>
            <div className={styles.inStock}>
              <img src={greenPoint} alt="зелёная точка" />
              <p>В наличии</p>
            </div>
            <div className={styles.btnWrapper} style={{ marginTop: "18px" }}>
              <BuyButton
                title="Заказать"
                clickHandler={() => {
                  if (!article) {
                    dispatch(
                      messageQueueAction.addMessage(
                        null,
                        "error",
                        "Необходимо выбрать артикул"
                      )
                    );
                  }

                  selectItem(data.title, article.title);
                }}
              />{" "}
            </div>
          </div>
        )}
        {article && matches && (
          <>
            <Swiper
              ref={swiperRef}
              slidesPerView={1}
              pagination={true}
              modules={[Pagination]}
              spaceBetween={"24px"}
              className={styles.customSwiper}
              onSlideChange={handleSlideChange}
            >
              {data.articles.map((item) => {
                return (
                  <SwiperSlide className={styles.slide}>
                    <div className={styles.characteristic}>
                      <p className={styles.title}>Характеристика</p>
                      <div className={styles.property}>
                        <div className={styles.item}>
                          <img src={size} alt="размер" />
                          <span className={styles.size}>
                            {item.width} x {item.height} мм
                          </span>
                        </div>
                        <div className={styles.item}>
                          <img src={door} alt="открывание" />
                          <span className={styles.size}>
                            {item.opening_direction
                              ? "Правое открывание"
                              : "Левое открывание"}
                          </span>
                        </div>
                      </div>
                      <div className={styles.info}>
                        <Item
                          children={[
                            <p>Основной замок:&nbsp;</p>,
                            <p>&nbsp;{article.main_lock ? "Есть" : "Нет"}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Дополнительный замок:&nbsp;</p>,
                            <p>&nbsp;{article.additional_lock ? "Есть" : "Есть"}</p>,
                          ]}
                        />
                        {
                          /*
                          <Item
                          children={[
                            <p>Толщина дверного полотна:</p>,
                            <p>{`${article.door_leaf_thickness} мм`}</p>,
                          ]}
                        />
                          */
                        }
                        <Item
                          children={[
                            <p>Количество контуров уплотнения:&nbsp;</p>,
                            <p>&nbsp;{`${article.sealing_contours}`}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Цвет покраски:&nbsp;</p>,
                            <p>&nbsp;{`${article.color}`}</p>
                          ]}
                        />
                        <Item
                          children={[
                            <p>Назначение двери:&nbsp;</p>,
                            <p>&nbsp;{`${article.target}`}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Наличие зеркала:&nbsp;</p>,
                            <p>&nbsp;{article.mirror ? "Есть" : "Нет"}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Особенности:&nbsp;</p>,
                            <p>&nbsp;{article.additional_features}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Наличие дефектов:&nbsp;</p>,
                            <p>&nbsp;{article.is_defect ? "Есть" : "Нет"}</p>,
                          ]}
                        />
                      </div>
                      <button
                        className={styles.viewPhotoBtn}
                        onClick={showImageHandler}
                      >
                        Посмотреть фото
                      </button>
                      <p className={styles.description}>{item.description.slice(0, 256)}</p>
                    </div>
                    <div className={styles.adaptivePrices}>
                      <div className={styles.inStock}>
                        <img src={greenPoint} alt="зелёная точка" />
                        <p>В наличии</p>
                      </div>
                      <div className={styles.discount}>
                        <p>-{item.discount}%</p>
                      </div>
                      <div className={styles.priceWrapper}>
                        <p className={styles.price}>
                          {item.price.toLocaleString()} ₽
                        </p>
                        <p className={styles.priceWithoutDiscount}>
                          <s>
                            {item.price_without_discount.toLocaleString()} ₽
                          </s>
                        </p>
                      </div>
                      <BuyButton
                        title="Заказать"
                        clickHandler={() => {
                          if (!article) {
                            dispatch(
                              messageQueueAction.addMessage(
                                null,
                                "error",
                                "Необходимо выбрать артикул"
                              )
                            );
                          }

                          selectItem(data.title, article.title);
                        }}
                      />{" "}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
      </div>
      {article && (
        <ViewImageModal show={show} setShow={setShow} article={article} />
      )}
      {article && (
        <ViewImageModal
          show={showDoor}
          setShow={setShowDoor}
          article={{
            ...article,
            images: [
              {
                url: data.image_entry,
              },
              {
                url: data.image_exit,
              },
            ],
          }}
          articleView={false}
        />
      )}
    </>
  );
};

export default memo(DoorItem);
