import { NewsItemDto, Response } from '../api/v1/dto';
import { allIcons } from './icons';
import { getRandomImage } from './images';

const createNewsItem = (title: string): NewsItemDto => {
	return {
		title,
		image: getRandomImage(),
		author: 'user'
	};
};

export const getNews = (): Response<NewsItemDto[]> => {
	return {
		data: [
			createNewsItem('Новая картина в стиле каля-маля'),
			createNewsItem('Встреча студентов школы'),
			createNewsItem('Завезли новые гитары!'),
			createNewsItem('Конкурс на самую длинную кожурку'),
			createNewsItem('День "открытых дверей"'),
			createNewsItem('Ещё одна новость'),
			createNewsItem('Опрос: Натюрморт или пейзаж?'),
			createNewsItem('Выступление гармонистов'),
			createNewsItem('Выставка работ школы кройки и шитья'),
			createNewsItem('Очень сложно придумывать заголовки новостей'),
		]
	}
}