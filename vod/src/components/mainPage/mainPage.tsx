import { useSelector } from 'react-redux';
import { getAllDataSelector } from '../../store/movieDataReducer/movieDataReducer.selectors';
import { SectionData } from '../../store/movieDataReducer/types';
import "./mainPage.css";
import MovieList from './movieList';

const MainPage = () => {
  const data = useSelector(getAllDataSelector);

  return (
    <div>
      <div className='site_title'>TestFlix</div>
      {data.map((category: SectionData) => {
        if (category.elements.length === 0) {
          return null;
        }
        return <MovieList category={category} />
      })}
    </div>
  )
}

export default MainPage