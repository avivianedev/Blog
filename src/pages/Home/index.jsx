import { useEffect, useState } from 'react'
import './style.css'

import { fechData } from '../../util/fetchData'
import { CardPost } from '../../components/CardsPost'
import { Button } from '../../components/Button'
import { Search } from '../../components/Search'
import { Loading } from '../../components/Loading'

function Home() {

  const [posts, SetPosts] = useState([])
  const [allposts, SetAllPost] = useState([''])
  const [page, SetPage] = useState(0)
  const [disabled, SetDisabled] = useState(false)
  const [SearchValue, SetSearchValue] = useState('')
  const [IsLoading, SetIsLoading] = useState(false)
  const [enableBtn, SetEnableBtn] = useState(false)

  const postPerPageValue = 9;

  useEffect(() => {
    const loading = async () => {
      SetEnableBtn(false)
      SetIsLoading(true)
      const postsAndPhotos = await fechData()
      SetAllPost(postsAndPhotos)
      SetPosts(() => postsAndPhotos.slice(0, postPerPageValue))
      SetIsLoading(false)
      SetEnableBtn(true)
    }
    loading()

  }, [])

  const filteredPosts = SearchValue ? allposts.filter(post => {
    return post.title.toLowerCase().includes(SearchValue.toLowerCase())
  }) : posts

  const handleChange = (e) => {
    return SetSearchValue(e.target.value)
  }

  const loadingPost = () => {
    const nextPage = page + postPerPageValue;
    SetPage(page + postPerPageValue)
    const nextPosts = allposts.slice(nextPage, nextPage + postPerPageValue)
    posts.push(...nextPosts)
    if (posts.length == allposts.length) {
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

      {IsLoading && <Loading />}

      <div className="posts-container container">
      {SearchValue && filteredPosts.length == 0 && (
          <span>Sem resultado para a sua busca <strong>{SearchValue}</strong></span>
        )}
        {filteredPosts.map(posts => (
          <CardPost
            key={posts.id}
            posts={posts}
          />
        ))}              

      </div>
      {!SearchValue && enableBtn ? (
        <Button
          onClick={loadingPost}
          disabled={disabled}
        />
      ): ''}

      
    </>
  )
}

export default Home
