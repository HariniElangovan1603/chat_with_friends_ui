import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './Layout/Layout';
import Create from "./component/Create";
import Update from "./component/Update";
import List from "./component/List";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import { useState } from "react";

function App() {
  // let [authUser,setSuthUser] = useState(null)

  return (
   
   
    <BrowserRouter>
    <Layout>
    <Routes>
       <Route  path='/' element={<Home/>}/>
      <Route  path='/create' element={<Create/>}/>
       <Route  path='/list' element={<List/>}/>
       <Route  path='/update' element={<Update/>}/>
       <Route path='/signin' element={<SignIn/>}/>
    </Routes>
     </Layout>
    </BrowserRouter>
  
  
  
  );
}

export default App;
