// Your code here
let createEmployeeRecord = function(array){
  return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
  }
}

function createEmployeeRecords(array){
  const map = array.map(employee => createEmployeeRecord(employee));
  return map
}

let createTimeInEvent = function(employee, dateStamp){
  let [date, hour] = dateStamp.split(' ')

  employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
  })

  return employee
}

let createTimeOutEvent = function(employee, dateStamp){
  let [date, hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
  })

  return employee
}

function hoursWorkedOnDate(employee, formDate) {
  let inEvent = employee.timeInEvents.find(function(e){
      return e.date === formDate
  })
  let outEvent = employee.timeOutEvents.find(function(e){
      return e.date === formDate
  })
  return (outEvent.hour - inEvent.hour) / 100

}

function wagesEarnedOnDate(object, date) {
  let hours = hoursWorkedOnDate(object, date);
  return hours * object.payPerHour
}

let allWagesFor = function(employee){
  let eligibleDates = employee.timeInEvents.map(function(e){
      return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(function(e){
    return e.firstName === firstName
  })
}

function calculatePayroll(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, rec){
      return memo + allWagesFor(rec)
  }, 0)
}
