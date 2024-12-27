function preloadCSS(cssFiles) {
  return Promise.all(
    cssFiles.map(file =>
      new Promise((resolve, reject) => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = file
        link.onload = resolve
        link.onerror = () => {
          console.warn(`Failed to load CSS: ${file}`)
          reject(file)
        }
        document.head.appendChild(link)
      })
    )
  )
}

function preloadPageResources(cssFiles) {
  return preloadCSS(cssFiles).then(() => {
  }).catch((failedFiles) => {
    console.error('Failed to load the following CSS files:', failedFiles);
  });
}

export default preloadPageResources;
