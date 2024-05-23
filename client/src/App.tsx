import './App.css';
import { HomePage } from './pages/Home-Page'
import {Route, Routes} from 'react-router-dom'
import { Header } from './components/header';
import { ElementForm } from './pages/Form-Elements';
import { RunList } from './pages/Run-List';


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Header/>}>
        <Route index element={<HomePage/>}/>
        <Route path='form-elements/:runId' element={<ElementForm/>}/>
        <Route path='runs-list' element={<RunList/>}/>
      </Route>
    </Routes>
  );
}
