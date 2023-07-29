import { useState } from 'react'
import { BrowserRouter , Route , Routes} from "react-router-dom";
import Home from '../src/Pages/Home'
import List from './Pages/List';
import Hotels from './Pages/Hotels';
import Login from './components/Login';
import Reserved from "./components/Reserved"

function App() {
  

  return (
    <BrowserRouter>
    
     <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/hotels' element={<List />} />
       <Route path='/hotels/:id' element={<Hotels />} />
       <Route path='/login' element={<Login />}/>
       <Route  path='/reserved' element={<Reserved />}/>
        
     </Routes>
    </BrowserRouter>
   
  )
}

export default App
