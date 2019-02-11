let dl = require('datalib')

let salaries = dl.csv('data/university-of-iowa-1998-and-2018.csv')

salaries = salaries.filter( row => (row.Gender == 'M' || row.Gender == 'F'))

let summary = dl.groupby('Year', 'Gender')
  .summarize({'Salary2': 'sum', '*': 'count', 'Name': 'distinct'})
  .execute(salaries)


  let summaryTable = dl.format.table(summary)
  console.log(summaryTable)
  
// let missingGender = salaries.filter( row => (row.Gender != 'M' && row.Gender != 'F'))
// let missingGenderTable = dl.format.table(missingGender)
// console.log(missingGenderTable)