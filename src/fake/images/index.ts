import image0 from './0.jpg';
import image1 from './1.jpg';;
import image2 from './2.jpg';
import image3 from './3.jpg';
import image4 from './4.jpg';
import image5 from './5.jpg';
import image6 from './6.jpg';
import image7 from './7.jpg';
import image8 from './8.jpg';

export const allImages = [image0, image1, image2, image3, image4, image5, image6, image7, image8];

export const getRandomImage = () => allImages[Math.floor(Math.random() * allImages.length)];