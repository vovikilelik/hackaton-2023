type State<T> = false | undefined | null | T;

export interface DragEnterCallback<S> {
	(event: DragEvent): State<S>;
}

export interface DragOverCallback<S> {
	(event: DragEvent, state: S): State<S>;
}

export interface DragDropCallback<S> {
	(event: DragEvent, state: S): void;
}

export interface DragDropApi<S> {
	onDragEnter?: DragEnterCallback<S>;
	onDragOver?: DragOverCallback<S>;
	onDragLeave?: DragDropCallback<S>;
	onDrop?: DragDropCallback<S>;
}

export interface DragDropAdapter {
	attach: (element: HTMLElement) => () => void;
}

export const createDragDropAdapter = <S>({ onDragEnter, onDragLeave, onDragOver, onDrop }: DragDropApi<S>): DragDropAdapter => {

	let state: State<S>;

	return {
		attach: (container: HTMLElement) => {
			const dragOver = (e: DragEvent) => {
				if (e.target !== container) return;
		
				if (!state) {
					state = onDragEnter?.(e)

					if (state) {
						onDragOver?.(e, state);

						e.stopPropagation();
					}
				} else {
					if (onDragOver?.(e, state)) {
						e.stopPropagation();
						e.​preventDefault​();
					}
				}
			}

			const dragLeave = (e: DragEvent) => {
				if (e.target !== container || !state) return;
				
				onDragLeave?.(e, state);
				
				state = undefined;
			}

			const drop = (e: DragEvent) => {
				if (e.target !== container || !state) return;
				
				onDrop?.(e, state);
				dragLeave(e);

				e.stopPropagation();
			}

			container.addEventListener('dragover', dragOver);
			container.addEventListener('dragleave', dragLeave);
			container.addEventListener('drop', drop);

			return () => {
				container.removeEventListener('dragover', dragOver);
				container.removeEventListener('dragleave', dragLeave);
				container.removeEventListener('drop', drop);
			}
		}
	};
}
