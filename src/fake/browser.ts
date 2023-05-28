import { DirectoryInfo, FileInfo, isDirectory } from "../api/v1/dto/browser";

let id = 0;
const mkFile = (prev: string, name: string, children?: Array<FileInfo | DirectoryInfo>) => {
  return {
    id: `${id++}`,
    name,
    path: `${prev}/${name}`,
    children
  }
}

const fs: DirectoryInfo = {
  id: 'root',
  name: '',
  path: '/',
  children: [
    mkFile('', 'one.txt'),
    mkFile('', 'two.txt'),
    mkFile('', 'foo.png'),
    mkFile('', 'moo.png'),
    mkFile('', 'loo.doc'),
    mkFile('', 'folder', [
      mkFile('folder', 'boo-x.txt'),
      mkFile('folder', 'boo-z.txt'),
      mkFile('folder', 'boo-y.txt'),
      mkFile('folder', 'hoo-two.txt'),
      mkFile('folder', 'hoo-one.txt'),
      mkFile('folder', 'folder-two.txt'),
      mkFile('folder', 'folder-one.txt'),
      mkFile('folder', 'too-two.txt'),
      mkFile('folder', 'too-one.txt'),
      mkFile('folder', 'empty folder 1', []),
      mkFile('folder', 'empty folder 2', []),
    ]),
    mkFile('', 'empty folder 1', []),
    mkFile('', 'empty folder 2', []),
    mkFile('', 'empty folder 3', [])
  ]
}

export const getFile = (path: string): DirectoryInfo | FileInfo => {
  const exp = path.split('/');

  let node: DirectoryInfo | FileInfo = fs;
  for (const e of exp) {

    if (isDirectory(node)) {
      const file = isDirectory(node) && node.children?.find(n => e === n.id || e === n.name);
      file && (node = file);
    }
  }

  return node;
}

export const setFile = (path: string, file : DirectoryInfo | FileInfo): DirectoryInfo | FileInfo => {
  const node = getFile(path);
  
  if (isDirectory(node)) {
    node.children = node.children ? [...node.children, node] : [node];
  }

  return file;
}