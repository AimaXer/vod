import { useState } from 'react';
import { Link } from "react-router-dom";
import { MovieData } from '../../store/movieDataReducer/types';
import "./movieItem.css";

export interface MovieItemProps {
  movieData: MovieData;
}

const MovieItem = ({ movieData }: MovieItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const movieTitleImage = movieData.item.images['16x9']
  const movieImageUrl = 'https:' + (movieTitleImage ? movieTitleImage[0].url : '')

  return (
  <div className='container' key={movieData.id}>
    <Link to={`movieDetails/${movieData.item.type}/${movieData.item.id}`}>
      <img 
        style={{
          width: isHovered ? '380px' : '300px',
          objectFit: 'contain',
          transition: 'width 0.5s, height 0.5s',
          borderRadius: '20px',
          marginTop: '20px'
        }}
        src={movieImageUrl}
        alt="new"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </Link>
    <div className='title'>{movieData.item.title}</div>
  </div>
  )
}

export default MovieItem