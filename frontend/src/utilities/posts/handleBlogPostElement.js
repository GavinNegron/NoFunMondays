import $ from 'jquery'

export const handleBlogPostElement = (element, setSelectedElement, setElementStyles, elements) => {
  console.log('setSelectedElement:', setSelectedElement); // Check if it's a function
  
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

  const textClasses = elements.text[0]?.classes.map(item => item.class) || []
  const imageClasses = elements.image[0]?.classes || []

  if (textClasses.some(cls => element.classList.contains(cls))) {
    if ($('.edit-text-styles').is(':visible')) return
    $('.edit-image-styles').stop(true, true).fadeOut()
    $('.edit-text-styles').css('display', 'flex').hide().stop(true, true).fadeIn()
  }

  if (imageClasses.some(cls => element.classList.contains(cls))) {
    if ($('.edit-image-styles').is(':visible')) return
    $('.edit-text-styles').stop(true, true).fadeOut()
    $('.edit-image-styles').css('display', 'flex').hide().stop(true, true).fadeIn()
  }
}
