export const API_URL = '';

export enum EndpointMap {
  GetAll = '/api/products/sections/main?elementsLimit=10&',
  GetMovieData = '/api/products',
  EndPhrase = 'lang=POL&platform=BROWSER'
}

export enum RequestId {
  FetchUser = 'FETCH_USER',
}

export const UNEXPECTED_ERROR_MESSAGE =
  'Oops! We detected an unexpected error. It has been reported and we will try to resolve it ASAP!';
