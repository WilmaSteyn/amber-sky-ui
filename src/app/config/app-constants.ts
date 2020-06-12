import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class AppConstants {

    public API_LOCATION = environment.apiLoacation;
    public PHOTO_BASE_PATH = environment.photoBasePath;
    public PHOTOS_PER_PAGE = environment.photosPerPage;

    public COPYRIGHT_SHORT = 'Wilma and Johan Steyn 2006-' + (new Date()).getFullYear() + '. All rights reserved';

  // public API_LOCATION = 'api/';
  // public PHOTO_BASE_PATH = '';
  // public PHOTOS_PER_PAGE = 30;


}
