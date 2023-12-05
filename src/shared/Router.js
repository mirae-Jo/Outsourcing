import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../pages/HomePage';
import Detail from '../pages/DetailPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
