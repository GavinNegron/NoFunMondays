import $ from 'jquery'

export const handleBlogPostElement = (element, setSelectedElement, setElementStyles, elements) => {
  if (!element) {
    $('.edit-text-styles, .edit-image-styles').stop(true, true).fadeOut()
    return
  }

  setSelectedElement(element)
  setElementStyles({
    color: element.style?.color || '',
    margin: element.style?.margin || '',
    fontFamily: element.style?.fontFamily || '',
  })

  const textClasses = elements.text[0]?.classes.map(item => item.class) 
  const imageClasses = elements.image[0]?.classes.map(item => item.class) 

  if (textClasses.some(cls => element.classList.contains(cls))) {
    if ($('.edit-text-styles').is(':visible')) return
    $('.edit-image-styles').stop(true, true).hide()
    $('.edit-text-styles').css('display', 'flex').show()
  }
  
  if (imageClasses.some(cls => element.classList.contains(cls))) {
    if ($('.edit-image-styles').is(':visible')) return
    $('.edit-text-styles').stop(true, true).hide()
    $('.edit-image-styles').css('display', 'flex').show()
  }
}
