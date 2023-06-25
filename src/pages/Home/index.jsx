import { useEffect, useState } from 'react'
import './style.css'

import { fechData } from '../../util/fetchdata'
import { CardPost } from '../../components/CardsPost'
import { Button } from '../../components/Button'
import { Search } from '../../components/Search'


function Home() {  

  const [posts, SetPosts] = useState([])  
  const [allposts, SetAllPost] = useState([])
  const [page, SetPage] = useState(0)
  const [disabled, SetDisabled] = useState(false) 
  const [SearchValue, SetSearchValue] = useState('')

  const postPerPageValue = 9;  
  const nextPage = page + postPerPageValue;

  const filteredPosts = SearchValue ? allposts.filter(post => {
     return post.title.toLowerCase().includes(SearchValue.toLowerCase())    
  } ) :posts
  
  const handleChange = (e) => {
    return SetSearchValue(e.target.value)
  }
   
  useEffect(()=> {
    const loading = async () => {
      const postsAndPhotos = await fechData() 
      SetPosts(postsAndPhotos.slice(page, postPerPageValue))
      SetAllPost(postsAndPhotos)      
    }  
    loading()  
  },[])
  
  const loadingPost = () => {
    SetPage(()=> page + postPerPageValue)    
    const nextPosts = allposts.slice(nextPage, nextPage + postPerPageValue)
    posts.push(...nextPosts)
    if(posts.length == allposts.length){
      SetDisabled(true)
    }      
  }

  return (
    <>
    <div className="title">
    <h1>Os melhores posts da atualidade</h1>       
    </div> 
    <Search
        SearchValue={SearchValue}
        handleChange={handleChange}
    />     
    
      <div className="posts-container container">  
      {filteredPosts.length === 0 && (
        <span>Sem resultado para a sua busca {SearchValue}</span>
      )}      
      {filteredPosts.map(posts => ( 
        <CardPost
          key={posts.id}
          posts={posts}
        />        
        ) )}     
       
      </div>
      {!SearchValue && ( 
        <Button
        onClick={loadingPost}  
        disabled={disabled}           
      />  
      )}
      
    </>
  )
}

export default Home
