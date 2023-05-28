import { join } from "@vovikilelik/task-queue-ts";
import { fakeReject, fakeResolve } from "../../../fake/fakeFetch";
import { DirectoryInfo, FileInfo } from "../dto/browser";
import { getFile, setFile } from "../../../fake/browser";

export interface GetFilePayload {
  path: string;
}

export interface PostFilePayload extends GetFilePayload {
  file: DirectoryInfo | FileInfo;
}

export const openFileTask = join<GetFilePayload, FileInfo | DirectoryInfo>(({ path }) => fakeResolve<FileInfo | DirectoryInfo>(getFile(path || '/'), 200));

export const appendFileTask = join<PostFilePayload, FileInfo | DirectoryInfo>(
  ({ path, file }) => file
    ? fakeResolve<FileInfo | DirectoryInfo>(setFile(path || '/', file!), 200)
    : fakeReject({})
);