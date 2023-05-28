import { DeclarativeContext } from "."

export interface ServiceContext extends DeclarativeContext {
    serviceName: string;
}

export interface FileExtensionService extends ServiceContext {
    supportedFiles: string[];
    href: string;
}

export const isServiceContext = (value: DeclarativeContext): value is ServiceContext => {
    return Boolean((value as ServiceContext).serviceName)
}