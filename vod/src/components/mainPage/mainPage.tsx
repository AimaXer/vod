import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { getAllDataSelector } from '../../store/movieDataReducer/movieDataReducer.selectors';
import { MovieData, SectionData } from '../../store/movieDataReducer/types';

const MainPage = () => {
  const data = useSelector(getAllDataSelector);
  console.log(data)
  const renderItem = useCallback(
    (movieData: MovieData) => {
      return <li>{movieData.item.title}</li>
    },
    [],
  )
  
  const renderList = useCallback(
    (category: SectionData) => {
      return (
        <div>
          <div>
            {category.title}  
          </div>          
          {category.elements.map((movieData: MovieData) => renderItem(movieData))}
        </div>
      )
    },
    [],
  )
  
  return (
    <div>
      {data.map((category: SectionData) => renderList(category))}
    </div>
  )
}

export default MainPage