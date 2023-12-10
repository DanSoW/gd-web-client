import { FC, memo, useEffect, useRef, useState } from "react";
import styles from "./DoorItem.module.css";
import {
  IArticleModel,
  IArticleValues,
  IDoorModel,
  IDoorValues,
} from "src/models/IDoorModel";
import door from "src/resources/images/door.svg";
import size from "src/resources/images/size.svg";
import discount from "src/resources/images/discount.svg";
import greenPoint from "src/resources/images/green_point.svg";
import BuyButton from "src/components/UI/BuyButton";
import { IconButton, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import ViewImageModal from "src/components/ViewImageModal";
import EditIcon from "@mui/icons-material/Edit";
import CharacteristicEdit from "../CharacteristicEdit";
import AddIcon from "@mui/icons-material/Add";
import CharacteristicAdd from "../CharacteristicAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionDialog from "src/components/QuestionDialog";
import DoorEdit from "../DoorEdit";
import { useAppDispatch } from "src/hooks/redux.hook";
import AdminAction from "src/store/actions/AdminAction";
import messageQueueAction from "src/store/actions/MessageQueueAction";

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

const Item = memo(Item2);

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
  const [activeId, setActiveId] = useState<number>(
    data.articles.length > 0 ? data.articles[0].id : -1
  );
  const [article, setArticle] = useState<IArticleModel | null>(
    data.articles.length > 0
      ? data.articles.find((item) => item.id === activeId) || null
      : null
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
  const [characteristicEdit, setCharactetisticEdit] = useState<boolean>(false);
  const [characteristicAdd, setCharacteristicAdd] = useState<boolean>(false);
  const [characteristicDelete, setCharacteristicDelete] =
    useState<boolean>(false);
  const showImageHandler = () => {
    setShow(true);
  };

  const dispatch = useAppDispatch();
  const addCharacteristic = (
    values: IArticleValues,
    images: Array<{ data_url: string; file?: File }>
  ) => {
    dispatch(
      // @ts-ignore
      AdminAction.doorCharacteristicAdd(data.id, values, images, () => {
        dispatch(
          messageQueueAction.addMessage(
            null,
            "success",
            "Новый артикул добавлен!"
          )
        );
        setCharacteristicAdd(false);
      })
    );
  };

  const deleteCharacteristic = () => {
    if (!article) {
      dispatch(
        messageQueueAction.addMessage(
          null,
          "error",
          "Необходимо выбрать артикул"
        )
      );
      return;
    }

    // @ts-ignore
    dispatch(
      AdminAction.doorCharacteristicDelete(data.id, article?.id, () => {
        dispatch(
          messageQueueAction.addMessage(
            null,
            "success",
            `Артикул ${article.title} удалён`
          )
        );
        setArticle(null);
        setActiveId(-1);

        setCharacteristicDelete(false);
      })
    );
  };

  const [doorEdit, setDoorEdit] = useState<boolean>(false);
  const [doorDelete, setDoorDelete] = useState<boolean>(false);

  const doorEditHandler = (
    values: IDoorValues,
    imageEntry: Array<{ data_url: string; file?: File }>,
    imageExit: Array<{ data_url: string; file?: File }>
  ) => {
    dispatch(
      AdminAction.doorEdit(
        data.id,
        values,
        imageEntry.length > 0 && imageEntry[0].file ? imageEntry[0].file : null,
        imageExit.length > 0 && imageExit[0].file ? imageExit[0].file : null,
        () => {
          dispatch(
            messageQueueAction.addMessage(
              null,
              "success",
              `Информация о двери ${data.title} была изменена`
            )
          );
          setDoorEdit(false);
        }
      )
    );
  };

  const doorDeleteHandler = () => {
    // @ts-ignore
    dispatch(
      AdminAction.doorDelete(data.id, () => {
        dispatch(
          messageQueueAction.addMessage(
            null,
            "success",
            `Дверь ${data.title} удалена`
          )
        );

        setDoorDelete(false);
      })
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.titleWrapper}>
            <p className={styles.h}>{data.title}</p>
            <IconButton
              onClick={() => {
                setDoorEdit(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setDoorDelete(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <div className={styles.doors}>
            <img src={data.image_entry} alt="передняя сторона" />
            <img src={data.image_exit} alt="обратная стороная" />
          </div>
          <p className={styles.description}>{data.description.slice(0, 256)}</p>
        </div>
        <div className={styles.articles} ref={containerRef}>
          <IconButton
            className={styles.article}
            onClick={() => {
              setCharacteristicAdd(true);
            }}
          >
            <AddIcon />
          </IconButton>
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
            <div className={styles.titleWrapper}>
              <p className={styles.title}>Характеристика</p>
              <IconButton
                onClick={() => {
                  setCharactetisticEdit(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setCharacteristicDelete(true);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
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
                children={[<p>Цвет покраски:&nbsp;</p>, <p>&nbsp;{`${article.color}`}</p>]}
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
              <BuyButton title="Заказать" clickHandler={() => { }} />{" "}
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
                  <SwiperSlide key={item.id} className={styles.slide}>
                    <div className={styles.characteristic}>
                      <div className={styles.titleWrapper}>
                        <p className={styles.title}>Характеристика</p>
                        <IconButton
                          onClick={() => {
                            setCharactetisticEdit(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setCharacteristicDelete(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
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
                            <p>&nbsp;{item.main_lock ? "Есть" : "Нет"}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Дополнительный замок:&nbsp;</p>,
                            <p>&nbsp;{item.additional_lock ? "Есть" : "Есть"}</p>,
                          ]}
                        />
                        {
                          /*
                          <Item
                          children={[
                            <p>Толщина дверного полотна:</p>,
                            <p>{`${item.door_leaf_thickness} мм`}</p>,
                          ]}
                        />
                          */
                        }
                        <Item
                          children={[
                            <p>Количество контуров уплотнения:&nbsp;</p>,
                            <p>&nbsp;{`${item.sealing_contours}`}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Цвет покраски:&nbsp;</p>,
                            <p>&nbsp;{`${item.color}`}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Назначение двери:&nbsp;</p>,
                            <p>&nbsp;{`${item.target}`}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Наличие зеркала:&nbsp;</p>,
                            <p>&nbsp;{item.mirror ? "Есть" : "Нет"}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Особенности:&nbsp;</p>,
                            <p>&nbsp;{item.additional_features}</p>,
                          ]}
                        />
                        <Item
                          children={[
                            <p>Наличие дефектов:&nbsp;</p>,
                            <p>&nbsp;{item.is_defect ? "Есть" : "Нет"}</p>,
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
                      <BuyButton title="Заказать" clickHandler={() => { }} />{" "}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
        )}
      </div>
      {article && show && (
        <ViewImageModal show={show} setShow={setShow} article={article} />
      )}
      {article && characteristicEdit && (
        <CharacteristicEdit
          open={characteristicEdit}
          setOpen={setCharactetisticEdit}
          content={article}
          doors_id={data.id}
        />
      )}
      {characteristicAdd && (
        <CharacteristicAdd
          open={characteristicAdd}
          setOpen={setCharacteristicAdd}
          addHandler={addCharacteristic}
        />
      )}
      {article && characteristicDelete && (
        <QuestionDialog
          open={characteristicDelete}
          setOpen={setCharacteristicDelete}
          text={`Вы действительно хотите удалить ${article.title} ?`}
          action={deleteCharacteristic}
          subText={""}
        />
      )}
      {doorEdit && (
        <DoorEdit
          open={doorEdit}
          setOpen={setDoorEdit}
          content={data}
          editHandler={doorEditHandler}
        />
      )}
      {doorDelete && (
        <QuestionDialog
          open={doorDelete}
          setOpen={setDoorDelete}
          text={`Вы действительно хотите удалить ${data.title} ?`}
          action={doorDeleteHandler}
          subText={""}
        />
      )}
    </>
  );
};

export default memo(DoorItem);
