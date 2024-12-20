import {MovieDto} from './MovieDto.ts';

export interface OmdbGetResponse {
  "Response": string,
  "Search"?: MovieDto[],
  "totalResults"?: string,
  "Error"?: string,
}