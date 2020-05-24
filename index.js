// Your code here
function createEmployeeRecord(employees) {
    return {
        firstName: employees[0],
        familyName: employees[1],
        title: employees[2],
        payPerHour: employees[3],
        timeInEvents: [],
        timeOutEvents:[]
    }
}

function createEmployeeRecords(employeesArr) {
    return employeesArr.map(createEmployeeRecord)
}

function createTimeInEvent(employee, time) {
    employee.timeInEvents.push(
        {
           type: 'timeIn',
           hour: parseInt(time.slice(-4), 10),
           date: time.slice(0, 10)
        }
    )
    return employee
}

function createTimeOutEvent(employee, time) {
    employee.timeOutEvents.push(
        {
           type: 'TimeOut',
           hour: parseInt(time.slice(-4), 10),
           date: time.slice(0, 10)
        }
    )
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(workDay => workDay.date === date)
    let timeOut = employee.timeOutEvents.find(workDay => workDay.date === date)
    return timeOut - timeIn
}