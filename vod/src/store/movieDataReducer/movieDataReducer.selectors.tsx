import { RootState } from '../root';
import { SectionData } from './types';

export const getAllDataSelector = ({ movieData }: RootState): SectionData[] => {
  return movieData.allData;
};
