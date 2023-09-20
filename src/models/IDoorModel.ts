export interface IDoorModel {
  id: number;
  title: string;
  image_entry: string;
  image_exit: string;
  description: string;
  articles: Array<IArticleModel>;
}

export interface IArticleModel {
  id: number;
  title: string;
  description: string;
  width: number;
  height: number;
  opening_direction: boolean;
  main_lock: boolean;
  additional_lock: boolean;
  door_leaf_thickness: number;
  sealing_contours: number;
  color: string;
  target: string;
  mirror: boolean;
  price: number;
  price_without_discount: number;
  discount: number;
  in_stock: number;
  images: Array<IImageModel>;
}

export interface IArticleValues {
  title: string;
  description: string;
  width: number;
  height: number;
  opening_direction: boolean;
  main_lock: boolean;
  additional_lock: boolean;
  door_leaf_thickness: number;
  sealing_contours: number;
  color: string;
  target: string;
  mirror: boolean;
  price: number;
  price_without_discount: number;
  discount: number;
  in_stock: number;
}

export interface IImageModel {
  url: string;
}
