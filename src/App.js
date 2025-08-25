import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './Layout/Layout';
import Create from "./component/users/Create";
import Update from "./component/users/Update";
import List from "./component/users/List";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import Post from './component/post/Post';
import Show from './component/post/Show';
import Edit from './component/post/Edit';


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
        <Route path='/post' element={<Post />} />
          <Route path='/show' element={<Show />} />
          <Route path='/edit' element={<Edit />} />
    </Routes>
     </Layout>
    </BrowserRouter>
  
  
  
  );
}

export default App;
