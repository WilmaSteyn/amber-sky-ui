import {BlogLink} from './blog-link';

export class Trip {

  public pkSpecialGallery: number;
  public name: string;
  public description: string;
  public linkBack: string;
  public featurePhotoFilename: string;
  public date: string;

  public blogs: BlogLink[];

}
