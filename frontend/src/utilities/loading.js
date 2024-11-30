function preloadCSS(cssFiles) {
  return Promise.all(
    cssFiles.map(file =>
      new Promise((resolve, reject) => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = file
        link.onload = resolve
        link.onerror = reject
        document.head.appendChild(link)
      })
    )
  )
}

function preloadPageResources(cssFiles) {
  const minimumLoadingTime = new Promise(resolve => setTimeout(resolve, 500))

  return Promise.all([preloadCSS(cssFiles), minimumLoadingTime])
}

export default preloadPageResources
