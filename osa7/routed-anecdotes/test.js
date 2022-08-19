const age = {
    "type": 'type',
    "value": 'type',
    "onChange": 'type',
    "reset": 'type'
  }

const test = {...age}
delete test.reset

console.log(age)
console.log(test)