let dl = require('datalib')

let salaries = dl.csv('data/university-of-iowa-1998-and-2018.csv')

let summary = dl.groupby('Year', 'Gender')
  .summarize({'Salary2': ['sum', 'median', 'mean', 'stdevp'], '*': 'count', 'Name': 'distinct'})
  .execute(salaries)


summary = summary.filter(row => ( row.Gender == 'F' || row.Gender == 'M'))

summary.sort(dl.comparator('-mean_Salary2'))

summary.sort(dl.comparator(['Year','Gender']))


let classifications = dl.groupby('Year', 'Class')
  .summarize({'*': 'count', 'Salary2': 'sum'})
  .execute(salaries)

classifications = classifications.filter(row => (row.count > 100))

let summaryTable = dl.format.table(summary)

// console.log(summaryTable)
// console.log(dl.format.table(classifications))

let salaries2018 = salaries.filter( row => (row.Year == 2018))

let salariesFemale = salaries2018.filter( row => (row.Gender == 'F')).map(dl.$('Salary2'))
let salariesMale = salaries2018.filter( row => (row.Gender == 'M')).map(dl.$('Salary2'))

let pValue = dl.z.test(salariesFemale, salariesMale)
// console.log(pValue)

 classifications = dl.groupby('Class')
  .summarize({'*': 'count', 'Salary2': 'mean'})
  .execute(salaries2018)
  .sort(dl.comparator('-count'))

  let classificationsTable = dl.format.table(classifications, {maxwidth: 40, limit: 10})

console.log(classificationsTable)

console.log(dl.format.summary(salaries))
// let femaleCustodians = salaries.filter( row => (row.Class == 'Custodian I'))
//   .filter(row => (row.Gender == 'F'))
//   .map(dl.$('Salary2'))
// let maleCustodians = salaries.filter( row => (row.Class == 'Custodian I'))
//   .filter(row => (row.Gender == 'M'))
//   .map(dl.$('Salary2'))
// let pvalueCustodians = dl.z.test(femaleCustodians, maleCustodians)
// // console.log(pvalueCustodians)

// let femaleAssistantProfessors = salaries.filter( row => (row.Class == 'Assistant Professor'))
//   .filter(row => (row.Gender == 'F'))
//   .map(dl.$('Salary2'))
// let maleAssistantProfessors = salaries.filter( row => (row.Class == 'Assistant Professor'))
//   .filter(row => (row.Gender == 'M'))
//   .map(dl.$('Salary2'))
// let pvalueAssistantProfessors = dl.z.test(femaleAssistantProfessors, maleAssistantProfessors)
// console.log('Assistant Professors p-value = '+ pvalueAssistantProfessors)