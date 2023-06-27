export async function fechData() {

  try {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')
    
    const [posts, photos] = await Promise.all([postResponse , photosResponse])

    const postsJson = await posts.json()
    const photosJson = await photos.json()

    const postsAndPhotos = postsJson.map((item, index) => {
      return{...item, cover: photosJson[index].url}
    })
   
    return postsAndPhotos

  } catch (error) {
      console.log('api error',error)
      alert('api error')
  }

}