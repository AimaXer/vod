import axios, { AxiosResponse } from 'axios';
import { EndpointMap } from '../constants';
import { GetAllDataResponse } from './types';

export const httpClient = axios.create({
  baseURL: 'https://portal.redge.media/',
});

export class DataApi {
  static getAllData(): Promise<AxiosResponse<GetAllDataResponse>['data']> {
    return httpClient.get(EndpointMap.GetAll + EndpointMap.EndPhrase);
  }
  static getSelectedMovieData({ movieId, movieType }: { movieId: string, movieType: string}): Promise<AxiosResponse<GetAllDataResponse>['data']> {
    return httpClient.get(EndpointMap.GetMovieData + `/${movieType}/${movieId}?` + EndpointMap.EndPhrase);
  }
}