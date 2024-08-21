import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Income from './Income';
import HeaderAppBar from './HeaderAppBar';
import Category from './Category';
import CategoryList from './CategoryList';
import IncomeList from './IncomeList';
import LoginAppBar from './LoginAppBar';
import About from './About';
import IncomeCategoryChart from './IncomeCategoryChart';
import { Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './ApplicationContext';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/HeaderAppBar" element={<HeaderAppBar />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/IncomeList" element={<IncomeList isFirebaseEnable={true} />} />
          <Route path="/LoginAppBar" element={<LoginAppBar />} />
          <Route path="/IncomeCategoryChart" element={<IncomeCategoryChart />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default App;
