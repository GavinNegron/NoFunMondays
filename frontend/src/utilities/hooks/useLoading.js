import { useState, useEffect } from 'react'

const useLoading = (loadingTasks, dependencies = []) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleLoading = async () => {
      try {
        await Promise.all(loadingTasks)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    handleLoading()
  }, dependencies)

  return { loading, error }
}

export default useLoading