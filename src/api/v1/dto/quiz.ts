export interface QuizElementDto {
	text: string;
}

export interface ElementVariantsDto<T = string> {
	data: T;
	correct?: boolean;
	push?: string;
}

export interface QuizVariantsElementDto extends QuizElementDto {
	variants: ElementVariantsDto[];
}

export const isQuizVariantsElementDto = (value: QuizElementDto): value is QuizVariantsElementDto =>
	Boolean((value as QuizVariantsElementDto).variants);

export type SupportedQuizElements = QuizVariantsElementDto | QuizElementDto;

export interface QuizDto {
	elements: SupportedQuizElements[];
}