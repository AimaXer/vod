import { useRef, useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { MovieData, SectionData } from '../../store/movieDataReducer/types';
import MovieItem from './movieItem';
import "./movieList.css";

const MOVIE_BANNER_WIDTH = 320;

export interface MovieListProps {
  category: SectionData;
}

const MovieList = ({ category }: MovieListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const moviesWidth = category.elements.length * MOVIE_BANNER_WIDTH;
  const baseBatchSize = Math.floor(window.innerWidth / MOVIE_BANNER_WIDTH)

  const handleScrollRight = () => {
    if (listRef.current) {
      const leftBatchSize = category.elements.length - scrollPosition / MOVIE_BANNER_WIDTH - baseBatchSize
      const newScrollPosition = scrollPosition + (leftBatchSize  > baseBatchSize ? 
      baseBatchSize
      :
      leftBatchSize) * MOVIE_BANNER_WIDTH;
      setScrollPosition(newScrollPosition);
    }
  };

  const handleScrollLeft = () => {
    if (listRef.current) {
      const newScrollPosition = scrollPosition - baseBatchSize * MOVIE_BANNER_WIDTH;
      setScrollPosition(newScrollPosition < 0 ? 0 : newScrollPosition);
    }
  };

  return (
    <div className='main_container' key={category.id}>
      <div className='category_title'>
        {category.title}  
      </div>
      <div 
        ref={listRef}
        className='list_container'
        style={{
          display: 'flex',
          flexDirection: 'row',
          transform: `translateX(-${scrollPosition}px)`,
          transition: 'transform 0.7s ease-out',
        }}
      >
        {category.elements.map((movieData: MovieData) => { return <MovieItem movieData={movieData} /> })}
      </div>
      {moviesWidth > window.innerWidth && 
        <div
          className='scroll_button_right'
          onClick={handleScrollRight}
        >
          <BsFillArrowRightCircleFill
            style={{
              color: 'white',
            }}
            size='2em'
          />
        </div>
      }
        
      {scrollPosition !== 0 &&
        <div
          className='scroll_button_left'
          onClick={handleScrollLeft}
        >
          <BsFillArrowLeftCircleFill 
            style={{
              color: 'white',
            }}
            size='2em'
          />
        </div>
      }
        
    </div>
  )
}

export default MovieList