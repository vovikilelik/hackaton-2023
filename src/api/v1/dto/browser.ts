export interface FileInfo {
  id: string;
  name: string;
  path: string;
}

export interface DirectoryInfo extends FileInfo {
  children?: Array<FileInfo | DirectoryInfo>
}

export const isDirectory = (value: any): value is DirectoryInfo => Boolean(value && value.children);

export const ROOT: DirectoryInfo = {
  id: 'root',
  name: '',
  path: '/'
}