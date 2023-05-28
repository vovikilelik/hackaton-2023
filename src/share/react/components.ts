export interface Children<E = React.ReactNode> {
	children?: E;
}

export interface ClassName {
	className?: string;
}

export interface Component<E = React.ReactNode | undefined> extends Children<E>, ClassName {};
