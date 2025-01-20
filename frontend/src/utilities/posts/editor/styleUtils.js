export const getElementStyles = (elementDom) => {
  if (!elementDom) return {}; 

  const computedStyles = window.getComputedStyle(elementDom)
  return {
    color: computedStyles.color,
    margin: computedStyles.margin,
    fontFamily: computedStyles.fontFamily,
    fontSize: computedStyles.fontSize,
    fontWeight: computedStyles.fontWeight,
    fontStyle: computedStyles.fontStyle,
    textDecoration: computedStyles.textDecoration,
    textAlign: computedStyles.textAlign,
  }
}

