



import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { InterceptorError } from './../adapters/interceptors/interceptor-error';

// import { PhotoRepository } from './../repository/IPhotoRepository';
// import { FlickrPhotoService } from './../services/flickr-photo.service';
// import { UseCaseFlickrPhotos } from './../use-case/flickr-photos/use-case-flickr-photos';
// import { UseCaseFlickrGetPhotoInfo } from './../use-case/flickr-photos/use-case-flickr-getPhotoInfo';

// const photoUseCaseSearchKeyWordFactory = (repo: PhotoRepository) => new UseCaseFlickrPhotos(repo);
// const photoUseCaseGetInforFactory = (repo: PhotoRepository) => new UseCaseFlickrGetPhotoInfo(repo);

// export const useCaseSearchPhotoProvider = {
//     provide: UseCaseFlickrPhotos,
//     useFactory: photoUseCaseSearchKeyWordFactory,
//     deps: [PhotoRepository]
// }

// export const useCaseGetInfoPhotoProvider = {
//     provide: UseCaseFlickrGetPhotoInfo,
//     useFactory: photoUseCaseGetInforFactory,
//     deps: [PhotoRepository]
// }


export const _providers = [
    // { provide: PhotoRepository, useClass: FlickrPhotoService }, useCaseSearchPhotoProvider, useCaseGetInfoPhotoProvider,
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: InterceptorError,
    //     multi: true
    // }
];