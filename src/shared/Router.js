import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavigationBar from './../components/Layout/NavigationBar';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import {ProFilePage} from 'pages/ProFilePage';

const Router = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="detail/:mountainName" element={<DetailPage />} />
        <Route path="ProFilePage:id" element={<ProFilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
