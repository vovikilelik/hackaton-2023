export interface Response<D> {
    data: D
}

export interface Info {
    uuid: string;
    title: string;
}

export interface DetailInfo extends Info {
    icon: string;
    description: string;
    vendor: string;
    version: string;
}