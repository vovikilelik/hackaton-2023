import { getGalleryTask } from '../../v1/tasks';


export class GalleryApi {
    getList() {
        return getGalleryTask()({ data: [] });
    }
}

export const galleryApi = new GalleryApi();
