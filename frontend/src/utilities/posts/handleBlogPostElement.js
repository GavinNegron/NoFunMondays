import $ from 'jquery'

export const handleBlogPostElement = (element, setSelectedElement) => {
  $('.editor-sidebar__add-elements').stop(true, true).fadeOut('fast')
  setSelectedElement(element)

  $('.edit-styles').stop(true, true).fadeToggle('fast')

}