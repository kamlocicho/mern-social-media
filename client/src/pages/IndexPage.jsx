import { useEffect, useState, useContext } from 'react'
import PostGrid from '../components/post/PostGrid'
import LoadingSpinner from '../components/LoadingSpinner';


function IndexPage() {
  const [posts, setPosts] = useState(null);


  useEffect(() => {
    fetch('http://localhost:3001/post')
    .then(response => response.json())
    .then(data => setPosts(data));
  }, [])
  
  let postGrid;
  if (posts) {
    postGrid = <PostGrid posts={posts.data.posts} />
  } else {
    postGrid = <LoadingSpinner />
  }


  return (
    <>
      {postGrid}
    </>
  )
}

export default IndexPage
