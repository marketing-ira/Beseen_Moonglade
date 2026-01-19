import { IGatsbyImageData } from "gatsby-plugin-image";

export interface CardItem {
  id?: number;
  label: string;
  imageName: string;
  alt?:string // e.g., "EntranceCanopy-place.png"
}

export interface PlaceCardProps {
  label: string;
  imageData: IGatsbyImageData | null;
  alt?: string;
}
