let dl = require('datalib')

let salaries = dl.csv('data/university-ot-iowa-1998-and-2018.csv')

let summary = dl.groupby('Year', 'Gender')
  .summarize({'Salary2': 'sum', '*': 'count', 'Name': 'distinct'})
  .execute(salaries)

summary = summary.filter(row => ( row.Gender == 'F' || row.Gender == 'M'))

let classifications = dl.groupby('Year', 'Class')
  .summarize({'*': 'count', 'Salary2': 'sum'})
  .execute(salaries)

classifications = classifications.filter(row => (row.count > 100))


console.log(dl.format.table(summary))
console.log(dl.format.table(classifications))