// Функция для проверки длины строки

const validateLength = (str, lengthStr) => {
  if (str.length <= lengthStr) {
    return ('true - строка подходит');
  }

  return ('false - строка не подходит');
};

validateLength('проверяемая строка', 20);
// console.log(validateLength('проверяемая строка', 20));
// console.log(validateLength('проверяемая строка', 18));
// console.log(validateLength('проверяемая строка', 10));

// Функция для проверки, является ли строка палиндромом

const palindrome = (str) => {
  str = str.replaceAll(' ', '').toLowerCase();
  return str === [...str].reverse().join('');
};

palindrome('Лёша на полке клопа нашёл ');
// console.log(palindrome('топот'));
// console.log(palindrome('ДовОд'));
// console.log(palindrome('Кекс'));
// console.log(palindrome('Лёша на полке клопа нашёл '));

// Функция извлекает цифры из строки и возвращает их в виде целого положительного числа

const extractNumber = (str) => {
  str = str.toString();
  let result = '';

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseFloat(str[i]))) {
      result += str[i];
    }
  }

  return parseFloat(result);
};

extractNumber('1 кефир, 0.5 батона');
// console.log(extractNumber('1 кефир, 0.5 батона'));
// console.log(extractNumber('а я томат'));

/*
Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку,
дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.

Если «добивка» слишком длинная, она обрезается с конца.
*/

const myPad = (source, count, addition) => {
  if (source.length >= count) {
    return source;
  }

  const preffixLength = count - source.length;
  const sample = addition;
  addition = '';

  while (addition.length < preffixLength - sample.length) {
    addition += sample;
  }

  return sample.slice(0, preffixLength - addition.length) + addition + source;
};

myPad('qwerty', 4, '0');
// console.log(myPad('1', 2, '0'));
// console.log(myPad('1', 4, '0'));
// console.log(myPad('q', 4, 'we'));
// console.log(myPad('q', 4, 'werty'));
// console.log(myPad('qwerty', 4, '0'));
