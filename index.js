// Your code here
function createEmployeeRecord(array){
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(arrayOfArrays){
    //Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
    return arrayOfArrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateStamp){
    let date = dateStamp.split(' ')[0]
    let time = parseInt(dateStamp.split(' ')[1])
    employeeRecord.timeInEvents.push({type: 'TimeIn', hour: time, date: date})
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let date = dateStamp.split(' ')[0]
    let time = parseInt(dateStamp.split(' ')[1])
    employeeRecord.timeOutEvents.push({type: 'TimeOut', hour: time, date: date})
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let timeIn = employeeRecord.timeInEvents.find(dayWorked => dayWorked.date === date)
    let timeOut = employeeRecord.timeOutEvents.find(dayWorked => dayWorked.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}


function wagesEarnedOnDate(employeeRecord, payDay){
    return hoursWorkedOnDate(employeeRecord, payDay) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    let daysWorked = employeeRecord.timeInEvents.map(time => {
        return time.date
    })

    return daysWorked.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employeeRecord, date)}, 0)
}

function findEmployeeByFirstName(scrArray, firstName){
    return scrArray.find(name => {return name.firstName === firstName})
}

function calculatePayroll(arrayOfEmployeeRecords){
    let sum = arrayOfEmployeeRecords.map(i => allWagesFor(i)) 
    return sum.reduce((num, sum) => num + sum)
}