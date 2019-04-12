export default {
  getPosition(element) {

    var actualLeft = element.offsetLeft,
      actualTop = element.offsetTop,
      current = element.offsetParent; 
    while (current !== null) {
      actualLeft += current.offsetLeft;
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return {
      left: actualLeft,
      top: actualTop
    };
  }
}