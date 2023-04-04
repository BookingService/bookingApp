export interface IFlat {
  requirements: IRequirements;
  _id: string;
  address: string;
  title: string;
  pricePerNight: number;
  reviews: IReview[];
  host: null;
  amenities: any[];
  imagesUrls: string[];
  description: string;
  location: Location;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ILocation {
  type: string;
  coordinates: number[];
}

export interface IRequirements {
  withAnimals: boolean;
  withKids: boolean;
  isAllowToSmoke: boolean;
  isParkingAvailable: boolean;
}

export interface IReview {
  _id: string;
  user: string;
  rating: number;
  description: null | string;
  flatId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
