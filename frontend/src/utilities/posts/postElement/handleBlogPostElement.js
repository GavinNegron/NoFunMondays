import $ from 'jquery'

export const handleBlogPostElement = (element, setSelectedElement, setElementStyles, elements) => {
  $('.editor-sidebar__add-elements').stop(true, true).fadeOut('fast')
  if (!element) {
    $('.edit-text-styles, .edit-image-styles, .edit-list-styles').stop(true, true).fadeOut('fast')
    return
  }
  setSelectedElement(element)
  setElementStyles({
    color: element.style?.color || '',
    margin: element.style?.margin || '',
    fontFamily: element.style?.fontFamily || '',
  })

  const textClasses = elements.text.classes.map(item => item.class)
  const imageClasses = elements.image.classes.map(item => item.class)
  const listClasses = elements.lists.classes.map(item => item.class)

  if (textClasses.some(cls => element.classList.contains(cls))) {
    if ($('.edit-text-styles').is(':visible')) return
    $('.edit-image-styles').stop(true, true).fadeOut('fast')
    $('.edit-list-styles').stop(true, true).fadeOut('fast')
    $('.edit-text-styles').stop(true, true).fadeIn('fast')
    $('.edit-text-styles').css('display', 'flex').show()
  }
  
  if (imageClasses.some(cls => element.classList.contains(cls))) {
    if ($('.edit-image-styles').is(':visible')) return
    $('.edit-text-styles').stop(true, true).fadeOut('fast')
    $('.edit-list-styles').stop(true, true).fadeOut('fast')
    $('.edit-image-styles').stop(true, true).fadeIn('fast')
    $('.edit-image-styles').css('display', 'flex').show()
  }

  if (listClasses.some(cls => element.classList.contains(cls))) {
    if ($('.edit-list-styles').is(':visible')) return
    $('.edit-text-styles').stop(true, true).fadeOut('fast')
    $('.edit-image-styles').stop(true, true).fadeOut('fast')
    $('.edit-list-styles').stop(true, true).fadeIn('fast')
    $('.edit-list-styles').css('display', 'flex').show()
  }
}
