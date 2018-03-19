const { localStorage } = require('./localStorage/localStorage');

const capitalize = (string = '') => [...string].map(    
    (char, index) => index ? char : char.toUpperCase()
).join('');

const translateText = (string) => {
    let lang = localStorage.get('language') || 'eng';
    const translate = require(`../translations/${lang}/${lang}`);
    const key = string.split(".")[0];
    const value = string.split(".")[1];

    return translate[key][value];
}

const injectString = (text, items) => {
    let split = text.split('%s');
    let result = ""; 
    split.forEach((item, index) => { if(index < split.length-1) result += item + items[index]; else result += item});
    return result;
}

module.exports = {
    capitalize,
    translateText,
    injectString
}