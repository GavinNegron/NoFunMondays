import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from '../404/404'
import Navbar from '../layout/navbar'
import Footer from '../layout/footer'
import { Helmet } from 'react-helmet-async'
import loading from '../../utilities/loading'
import LoadingScreen from '../templates/base/loading'

function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loadingState, setLoadingState] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const handleLoading = async () => {
      await Promise.all([loading(['/css/blog-post.css']), new Promise(resolve => setTimeout(resolve, 1000))])

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
        <link rel="stylesheet" href="/css/blog-post.css" />
      </Helmet>
      <Navbar />
      <main className="main">
        <div className="post">
          <div className="post__inner">
            <div className="post__inner__header d-flex">
              <img src={post.imageUrl} alt={post.title} />
            </div>
            <div className="post__inner__content">
              <div className="post__inner__content__header">
                <p>{post.title}</p>
              </div>
              <div className="post__inner__content__elements">
                {post.elements && post.elements.length > 0 && post.elements.map((element, index) => {
                  const elementId = `${element.id}`;

                  const elementStyles = element.style ? element.style : {}

                  switch (element.type) {
                    case 'text':
                      return (
                        <div key={index} id={elementId} className="text-element" style={elementStyles}>
                          {element.content}
                        </div>
                      );
                    case 'header':
                      return (
                        <div key={index} id={elementId} className="header-element" style={elementStyles}>
                          {element.content}
                        </div>
                      );
                    case 'image':
                      return (
                        <div key={index} id={elementId} className="image-element" style={elementStyles}>
                          <img src={element.content} alt={`Element ${index}`} />
                        </div>
                      );
                    default:
                      return <div key={index} id={elementId} style={elementStyles}>{element.content}</div>;
                  }
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
