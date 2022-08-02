function createElement(element, cssClass) {
  const elementName = document.createElement(element);
  elementName.classList.add(cssClass);
  return elementName;
}

export default createElement;
