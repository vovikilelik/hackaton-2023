import { join } from "@vovikilelik/task-queue-ts"
import { fakeResolve } from "../../../fake/fakeFetch";
import { PosterDto, Response } from "../dto";
import { getPosters } from '../../../fake/posters';

export const getGalleryTask = () =>
  join<Response<PosterDto[]>>(
    () => fakeResolve(getPosters())
  );
