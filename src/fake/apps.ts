import { Application, FileExtensionService } from "../api/v1/dto";
import textAppIcon from './icons/libreoffice-writer.png';
import { randomDescription, randomIcon, randomTitle } from "./generators";
import { allIcons } from './icons';

export interface AppFilter {
  text?: string;
}

let guid = 0;

const generateApp = (): Application => {
  const loid = ++guid;

  return (
    {
      info: {
        uuid: `UUID ${loid}`,
        icon: randomIcon(),
        title: `${randomTitle()} ${loid}`,
        version: '1.0.0',
        vendor: 'Foo Inc ©',
        description: randomDescription()
      },
      context: { href: '' }
    }
  );
};

const libApp: Application<FileExtensionService> = {
  info: {
    uuid: `library`,
    icon: allIcons[5],
    title: 'Библиотека имени В.И. Ленина',
    vendor: 'Moo Inc',
    version: '1.0.0',
    description: 'Содержит более 5000 изданий.'
  },
  context: {
    serviceName: 'FileExtension',
    href: 'https://texteditor.com/',
    supportedFiles: ['.txt']
  }
};

const notesApp: Application<FileExtensionService> = {
  info: {
    uuid: `music`,
    icon: allIcons[8],
    title: 'Великая библиотека нот',
    vendor: 'Moo Inc',
    version: '1.0.0',
    description: 'Содержит ноты всех известных композиторов.'
  },
  context: {
    serviceName: 'FileExtension',
    href: 'https://texteditor.com/',
    supportedFiles: ['.txt']
  }
};

const textApp: Application<FileExtensionService> = {
  info: {
    uuid: `text`,
    icon: textAppIcon,
    title: 'Просмотр текстовых файлов',
    vendor: 'Moo Inc',
    version: '1.0.0',
    description: 'Позволяет открывать тектовые файлы.'
  },
  context: {
    serviceName: 'FileExtension',
    href: 'https://texteditor.com/',
    supportedFiles: ['.txt']
  }
};

export const allApps = [notesApp, libApp, textApp, ...Array(20).fill({}).map(generateApp)];

export const testApps = allApps.slice(1, 5);