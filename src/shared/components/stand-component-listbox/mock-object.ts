import { IModelFlickrPhoto } from "src/core/models/photo.model";

//Crear objetos mock photo
export const _mockPhoto: IModelFlickrPhoto = {
    id: '566669',
    url_image: 'https://live.staticflickr.com/123456/566669_99999_w.jpg',
    name: 'The flowers',
    author: 'Gerardo',
    username: 'gereardo',
    description: 'Flores amarillas',
    views: 44,
    visibility: { public: 1, friend: 0, family: 0 },
    count_comment: '50',
    count_tags: '10',
    tags: []
  };
  
  export const expectedResultOfPhoto: IModelFlickrPhoto = {
    id: '566669',
    url_image: `https://live.staticflickr.com/123456/566669_99999_w.jpg`,
    name: 'The flowers',
    author: 'Gerardo',
    username: 'gereardo',
    description: 'Flores amarillas',
    views: 44,
    visibility: {
      public: 1,
      friend: 0,
      family: 0
    },
    count_comment: '50',
    count_tags: '10',
    tags: []
  }
  