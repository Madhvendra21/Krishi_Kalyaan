import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreditScoreSlider from './Components/CreditScoreSlider';
import CreditScore from './Components/CreditScore';
import './App.css';



function App() {


  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreditScore />} />
          <Route path="/CreditScoreSlider" element={<CreditScoreSlider />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
