import { FC, memo, useEffect, useRef, useState } from "react";
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

export interface IDoorItemProps {
  data: IDoorModel;
}

const DoorItem: FC<IDoorItemProps> = ({ data }) => {
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

  const generateDot = (firstStr: string, lastStr: string, plus: number = 0) => {
    const res = 58 - (firstStr.length + lastStr.length + plus);
    if (res < 0) {
      return "";
    }
    const c = ".";
    let resStr = "";
    for (let i = 0; i < res; i++) {
      resStr += c;
    }

    return resStr;
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <p className={styles.h}>{data.title}</p>
          <div className={styles.doors}>
            <img src={data.image_entry} alt="передняя сторона" />
            <img src={data.image_exit} alt="обратная стороная" />
          </div>
          <p className={styles.description}>{data.description}</p>
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
              <div className={styles.item}>
                <p>Основной замок:</p>
                <p className={styles.dotted}>
                  {generateDot(
                    "Основной замок:",
                    article.main_lock ? "Есть" : "Нет",
                    -8
                  )}
                </p>
                <p>{article.main_lock ? "Есть" : "Нет"}</p>
              </div>
              <div className={styles.item}>
                <p>Дополнительный замок:</p>
                <p className={styles.dotted}>
                  {generateDot(
                    "Дополнительный замок:",
                    article.additional_lock ? "Есть" : "Нет",
                    -5
                  )}
                </p>
                <p>{article.additional_lock ? "Есть" : "Нет"}</p>
              </div>
              <div className={styles.item}>
                <p>Толщина дверного полотна:</p>
                <p className={styles.dotted}>
                  {generateDot(
                    "Толщина дверного полотна:",
                    `${article.door_leaf_thickness} мм`,
                    -2
                  )}
                </p>
                <p>{`${article.door_leaf_thickness} мм`}</p>
              </div>
              <div className={styles.item}>
                <p>Количество контуров уплотнения:</p>
                <p className={styles.dotted}>
                  {generateDot(
                    "Количество контуров уплотнения:",
                    `${article.sealing_contours}`,
                    -2
                  )}
                </p>
                <p>{`${article.sealing_contours}`}</p>
              </div>
              <div className={styles.item}>
                <p>Цвет покраски:</p>
                <p className={styles.dotted}>
                  {generateDot("Цвет покраски:", `${article.color}`, -7)}
                </p>
                <p>{`${article.color}`}</p>
              </div>
              <div className={styles.item}>
                <p>Назначение двери:</p>
                <p className={styles.dotted}>
                  {generateDot("Назначение двери:", `${article.target}`, -7)}
                </p>
                <p>{`${article.target}`}</p>
              </div>
              <div className={styles.item}>
                <p>Наличие зеркала:</p>
                <p className={styles.dotted}>
                  {generateDot(
                    "Наличие зеркала:",
                    article.mirror ? "Есть" : "Нет",
                    -10
                  )}
                </p>
                <p>{article.mirror ? "Есть" : "Нет"}</p>
              </div>
            </div>
            <button className={styles.viewPhotoBtn}>Посмотреть фото</button>
            <p className={styles.description}>{article.description}</p>
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
              <p>В наличии {article.in_stock} шт.</p>
            </div>
            <div className={styles.btnWrapper} style={{ marginTop: "18px" }}>
              <BuyButton title="Заказать" clickHandler={() => {}} />{" "}
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
                  <SwiperSlide>
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
                        <div className={styles.item}>
                          <p>Основной замок:</p>
                          <p className={styles.dotted}>
                            {generateDot(
                              "Основной замок:",
                              item.main_lock ? "Есть" : "Нет",
                              -8
                            )}
                          </p>
                          <p>{item.main_lock ? "Есть" : "Нет"}</p>
                        </div>
                        <div className={styles.item}>
                          <p>Дополнительный замок:</p>
                          <p className={styles.dotted}>
                            {generateDot(
                              "Дополнительный замок:",
                              item.additional_lock ? "Есть" : "Нет",
                              -5
                            )}
                          </p>
                          <p>{item.additional_lock ? "Есть" : "Нет"}</p>
                        </div>
                        <div className={styles.item}>
                          <p>Толщина дверного полотна:</p>
                          <p className={styles.dotted}>
                            {generateDot(
                              "Толщина дверного полотна:",
                              `${item.door_leaf_thickness} мм`,
                              -2
                            )}
                          </p>
                          <p>{`${item.door_leaf_thickness} мм`}</p>
                        </div>
                        <div className={styles.item}>
                          <p>Количество контуров уплотнения:</p>
                          <p className={styles.dotted}>
                            {generateDot(
                              "Количество контуров уплотнения:",
                              `${item.sealing_contours}`,
                              -2
                            )}
                          </p>
                          <p>{`${item.sealing_contours}`}</p>
                        </div>
                        <div className={styles.item}>
                          <p>Цвет покраски:</p>
                          <p className={styles.dotted}>
                            {generateDot("Цвет покраски:", `${item.color}`, -7)}
                          </p>
                          <p>{`${item.color}`}</p>
                        </div>
                        <div className={styles.item}>
                          <p>Назначение двери:</p>
                          <p className={styles.dotted}>
                            {generateDot(
                              "Назначение двери:",
                              `${item.target}`,
                              -7
                            )}
                          </p>
                          <p>{`${item.target}`}</p>
                        </div>
                        <div className={styles.item}>
                          <p>Наличие зеркала:</p>
                          <p className={styles.dotted}>
                            {generateDot(
                              "Наличие зеркала:",
                              item.mirror ? "Есть" : "Нет",
                              -10
                            )}
                          </p>
                          <p>{item.mirror ? "Есть" : "Нет"}</p>
                        </div>
                      </div>
                      <button className={styles.viewPhotoBtn}>
                        Посмотреть фото
                      </button>
                      <p className={styles.description}>{item.description}</p>
                    </div>
                    <div className={styles.adaptivePrices}>
                      <div className={styles.inStock}>
                        <img src={greenPoint} alt="зелёная точка" />
                        <p>В наличии {item.in_stock} шт.</p>
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
                      <BuyButton title="Заказать" clickHandler={() => {}} />{" "}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
      </div>
    </>
  );
};

export default memo(DoorItem);
