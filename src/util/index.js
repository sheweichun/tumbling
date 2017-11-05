

export function toThousands(num) {
    if(num == null) return '- -';
    let numStr = (num || 0).toString();
    let dotIndex = numStr.indexOf('.');
    if (dotIndex >= 0) {
      let integerStr = numStr.substring(0, dotIndex);
      let floatStr = numStr.substring(dotIndex + 1);
      if(keepFloat){
        return integerStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + floatStr; 
      }else{
        return integerStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      }
    }
    return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  }
  
  export function setTransformStyle(el,style){
    el.style.transform = style;
    el.style.webkitTransform = style;
    el.style.mozTransform = style;
    el.style.msTransform = style;
    el.style.oTransform = style;
  }
  
  export function setTransformByStyle(el,style){
    return `transform:${style};webkit-transform:${style};moz-transform:${style};ms-transform:${style};o-transform:${style}`
  }
  
  export const NUMBER_REG = new RegExp("[0-9]")