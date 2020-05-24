// Your code here
function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0], 
        familyName: employeeArray[1], 
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrays){
    return employeeArrays.map(createEmployeeRecord)

}

function createTimeInEvent(employeeRecord, timeDateStamp){
    employeeRecord.timeInEvents.push(
        {
            type: 'TimeIn',
            hour: parseInt(timeDateStamp.slice(-4), 10),
            date: timeDateStamp.slice(0, 10)
        }
    )
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeDateStamp){
    employeeRecord.timeOutEvents.push(
        {
            type: 'TimeOut',
            hour: parseInt(timeDateStamp.slice(-4), 10),
            date: timeDateStamp.slice(0, 10)
        }
    )
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    let timeIn = (employeeRecord.timeInEvents.find(event => event.date === dateStamp)).hour
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === dateStamp).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    return (employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, dateStamp))
}

function allWagesFor(employeeRecord){
    let datesWorked = employeeRecord.timeInEvents.map(event => {return event.date})
   let allWages = datesWorked.map(element => wagesEarnedOnDate(employeeRecord, element))
    return allWages.reduce(function(element, runningTotal) {
        return element + runningTotal
    })

}

function findEmployeeByFirstName(employeeRecordsArray, firstName){
    return employeeRecordsArray.find(element => element.firstName == firstName)
    
}
function calculatePayroll(employeeRecords){
    let allWages = employeeRecords.map(employee => allWagesFor(employee))
    return allWages.reduce(function(ind, rt) {
        return ind + rt
    })
}