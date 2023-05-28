import { PosterDto, Response } from '../api/v1/dto';
import { MarkDto } from '../api/v1/dto/mark';
import { getRandomImage } from './images';

const createPoster = (title: string): PosterDto => {
	const image = getRandomImage();

	const marks: MarkDto[] = [
		{
			author: 'group',
			text: 'any text',
			timestamp: (new Date()).toTimeString(),
			mark: Math.round(Math.random() * 5)
		},
		{
			author: 'group',
			text: 'any text',
			timestamp: (new Date()).toTimeString(),
			mark: Math.round(Math.random() * 5)
		},
		{
			author: 'group',
			text: 'any text',
			timestamp: (new Date()).toTimeString(),
			mark: Math.round(Math.random() * 5)
		}
	];

	return {
		title,
		image,
		author: 'user',
		content: image,
		marks,
		type: 'picture'
	};
};

export const getPosters = (): Response<PosterDto[]> => {
	return {
		data: [
			createPoster('Новая картина в стиле каля-маля'),
			createPoster('Встреча студентов школы'),
			createPoster('Завезли новые гитары!'),
			createPoster('Конкурс на самую длинную кожурку'),
			createPoster('День "открытых дверей"'),
			createPoster('Ещё одна новость'),
			createPoster('Опрос: Натюрморт или пейзаж?'),
			createPoster('Выступление гармонистов'),
			createPoster('Выставка работ школы кройки и шитья'),
			createPoster('Очень сложно придумывать заголовки новостей'),
		]
	}
}