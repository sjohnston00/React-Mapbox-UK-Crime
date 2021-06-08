const filterCrimeNames = (array, character) => {
  let newNames = [];
  for (let index = 0; index < array.length; index++) {
    let element = array[index];
    element.category = element.category.split(character).join(" ");

    newNames.push(element);
  }
  return newNames;
};

module.exports = filterCrimeNames;
