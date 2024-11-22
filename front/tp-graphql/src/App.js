import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import HomePage from './pages/HomePage';
import AccountsPage from './pages/AccountsPage';
import TransactionsPage from './pages/TransactionsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar';


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
