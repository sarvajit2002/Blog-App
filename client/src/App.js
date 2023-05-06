
import './App.css';
import Header from './components/Header';
import {Routes,Route} from "react-router-dom"
import Blogs from './pages/Blogs';
import Login from './pages/login';
import Register from './pages/register';
import UserBlogs from './pages/UserBlogs';
import CreateBlogs from './pages/CreateBlogs';
import BlogDetails from './pages/BlogDetails';
import {Toaster} from "react-hot-toast"
function App() {
  return (
    <div className='container'>
   <Header/>
   <Toaster/>
    <Routes>
   <Route path="/" element={<Blogs />} />
   <Route path="/blogs" element={<Blogs />} />
   <Route path="/my-blogs" element={<UserBlogs />} />
   <Route path="/blog-details/:id" element={<BlogDetails />} />
   <Route path="/create-blog" element={<CreateBlogs/>} />
   <Route path="/login" element={<Login />} />
   <Route path="/register" element={<Register />} />
    </Routes>
    </div>
    
  );
}

export default App;
