import React from 'react';
import './App.css';
import { useEffect } from 'react';
import {useTelegram} from './hooks/useTelegram'
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import VacancyFeed from './pages/VacancyFeed/VacancyFeed';
import VacancyDetailed from './pages/VacancyDetailed/VacancyDetailed';

function App() {
  const {tg, onToggleButton} = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);
  // useEffect(() => {
  //   tg.postEvent('web_app_data_send', {
  //     data: 'user_visited_vacancies'
  //   });
  // }, [tg]);
 

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route index element={<VacancyFeed />}/>
        {/* <Route path={'/form'} element={<Form />}/> */}
        <Route path={'/vacancies'} element={<VacancyFeed  />}/>
        <Route path={'/vacancy'} element={<VacancyDetailed  />}/>
      </Routes>
    </div>
  );
}

export default App;
