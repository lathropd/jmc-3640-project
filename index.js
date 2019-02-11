let fs = require('fs')
let dl = require('datalib')

let data = dl.csv('./data/bball-salaries-1.csv')
// console.log(data)

let payrollByPennant = dl.groupby('Pennant')
  .summarize({'*': 'count', Rank: ['mean', 'median', 'stdevp']})
  .execute(data)

console.log('payroll by league pennant status')
console.log(payrollByPennant)

let payrollByWSStatus = dl.groupby(['Pennant','WS'])
  .summarize({'*': 'count', Rank: ['mean', 'median', 'stdevp']})
  .execute(data)

console.log('payroll by World Series status')
console.log(payrollByWSStatus)

let worldChampsMeanRank = payrollByWSStatus[0].mean_Rank
let worldChampsStdev =  payrollByWSStatus[0].stdevp_Rank

console.log('The mean payroll rank of World Series winners is ' + worldChampsMeanRank)
console.log('The standard deviation in payroll rank of World Series winners is ' + worldChampsStdev)

let payrollOverall = dl.groupby()
  .summarize({'*': 'count', Rank: ['mean', 'median', 'stdevp']})
  .execute(data)
console.log(payrollOverall)



