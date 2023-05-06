import axios from 'axios';
import React,{useState,useEffect} from 'react'
import BlogCard from '../components/BlogCard'
function Blogs() {
  const [blogs,setBlogs] = useState({})
  const getAllBlogs = async(req,res) => {
    try {
      const {data} = await axios.get('/api/blog/all-blog')
      if(data?.success){
        setBlogs(data?.blogs)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
   getAllBlogs();
  },[])
  return (
    <div>
    {Array.isArray(blogs) &&
        blogs.map((blog) => (
          <BlogCard
          id={blog?._id}
          isUser={localStorage.getItem('userId') === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
        </div>
  )
}

export default Blogs