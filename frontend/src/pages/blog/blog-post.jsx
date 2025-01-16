// React
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// Layout
import NotFound from '../404/404'
import Navbar from '../layout/navbar/navbar'
import Footer from '../layout/footer/footer'
import LoadingScreen from '../components/base/loading'

// Utilities
import loading from '../../utilities/loading'
import RenderElements from '../../utilities/posts/postElement/renderElements'

function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loadingState, setLoadingState] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/blog-post.module.css']), new Promise(resolve => setTimeout(resolve, 500))])
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }

        const posts = await response.json()
        const matchedPost = posts.find(p => p.slug === slug)

        if (matchedPost) {
          setPost(matchedPost)
        } else {
          setNotFound(true)
        }
      } catch (error) {
        setNotFound(true)
      } finally {
        setLoadingState(false)
      }
    }

    handleLoading()
  }, [slug])

  if (loadingState) {
    return <LoadingScreen />
  }

  if (notFound) {
    return <NotFound />
  }
  return (
    <>   
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <Navbar />
      <main className="main">
        <div className="post">
          <div className="post__inner">
            <div className="post__header d-flex">
              <img src={post.imageUrl} alt={post.title} draggable='false'/>
            </div>
            <div className="post__content">
              <div className="post__content-header">
                <p>{post.title}</p>
              </div>
              <div className="post__elements">
                {post.elements && post.elements.length > 0 && post.elements.map((element) => {
                  return <RenderElements key={element.id} element={element} editor={false}/>  
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default BlogPost