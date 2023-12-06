import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/HomePage';
import Detail from '../pages/DetailPage';
import Header from 'components/Layout/Header';
import NavigationBar from 'components/Layout/NavigationBar';

const Router = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
