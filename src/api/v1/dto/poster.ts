import { MarkDto } from './mark';

export type PosterType = 'sound' | 'picture' | 'video' | 'text'; 

export interface PosterDto {
	type: PosterType;
	title: string;
	description?: string;
	author: string;
	image?: string;
	marks?: MarkDto[];
	content: unknown;
}
