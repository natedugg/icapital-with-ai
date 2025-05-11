import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvestorList from './components/InvestorList.tsx';
import InvestorForm from './components/InvestorForm.tsx';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<InvestorList />} />
      <Route path="/investors/add" element={<InvestorForm />} />
      <Route path="/investors/:id" element={<InvestorForm />} />
    </Routes>
  </BrowserRouter>
);

export default App;