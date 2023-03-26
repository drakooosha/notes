import React from "react";

const Highlight = (text,tags) => {
  const allWords = text.trim().replace(/[,.!:;?\s]/g, '#').split('#'); // массив всех слов без знаков препинания
  const tagWords = [...allWords.filter(word => tags.indexOf(word) !== -1)]; //массив всех теговых слов, получаемый путём перебирания массива слов и нахождения данного слова в массиве тегов
  const regString = tags.map(tag => `${tag}(?=[,.!:;?\\s])|${tag}$`).join('|'); // создание строки для регулярки
  const regExp = new RegExp(regString,'img'); // создание регулярки
  return text.split(regExp).map((element,index,array)=> { //разделение текста по тегам и оборачивание всех теговых слов в span. Результат - массив с реакт фрагментами(теговые слова, обёрнутые в span) и не теговыми словами, без обертки
    if(index < array.length-1) {                          
      const tagWord = tagWords.shift();
      return <>{element}<span className="cards__tag">{tagWord}</span></>
    }
    return element
  })
}

const CardBody = props =>
    <div className="cards__body">
      {props.editMode ? <div contentEditable={true} className="cards__area" id="text" ref={props.inputTextRef}>{Highlight(props.text, props.tags)}&nbsp;</div> : <p className="cards__text">{props.text}</p>}
    </div>

export default CardBody;