import { DefaultImagePipe } from './url-img-not-found.pipe';

describe('DefaultImagePipe', () => {
  const pipe = new DefaultImagePipe();
  const defaultImage = 'path/to/default/image.jpg';

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the first image path from an array of image paths', () => {
    const imagePaths = ['path/to/image1.jpg', 'path/to/image2.jpg'];
    expect(pipe.transform(imagePaths, defaultImage)).toBe(imagePaths[0]);
  });

  it('should return the default image when given an empty array', () => {
    expect(pipe.transform([], defaultImage)).toBe(defaultImage);
  });

  it('should return the image path when given a single image path', () => {
    const imagePath = 'path/to/single/image.jpg';
    expect(pipe.transform(imagePath, defaultImage)).toBe(imagePath);
  });

  it('should return the default image when given an empty string', () => {
    expect(pipe.transform('', defaultImage)).toBe(defaultImage);
  });
});
