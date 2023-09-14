export interface IImageUploadingModel {
    uuid: string;
    data_url: string;
    filename: string;
    is_upload: boolean;
    label: string;
};

export interface IImageModel {
    id: number;
    url: string;
    label: string;
    filename: string;
};

export interface IImageArray {
    date:   string;
    images: IImage[];
}

export interface IImage {
    id:        number;
    filename:  string;
    filepath:  string;
    label:     string;
    created_at: string;
    updated_at: string;
}
