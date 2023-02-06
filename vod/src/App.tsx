import './App.css';
import { useEffect } from 'react';
import { getAllData } from './store/movieDataReducer/movieDataReducer.thunks';
import { useAppDispatch } from '.';
import MainPage from './components/mainPage/mainPage';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllData({}))
  }, [dispatch])
  
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
