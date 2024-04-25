import './App.css';
import { HomePage } from './pages/home-page'
import {Route, Routes} from 'react-router-dom'
import { Header } from './components/header';
import { ElementForm } from './pages/form-elements';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Header/>}/>
        <Route index element={<HomePage/>}/>
        <Route path='form-elements' element={<ElementForm/>}/>
    </Routes>
  );
}
