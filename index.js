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
           type: 'TimeIn',
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
    let timeIn = (employee.timeInEvents.find(workDay => workDay.date === date)).hour
    let timeOut = (employee.timeOutEvents.find(workDay => workDay.date === date)).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return employee.payPerHour * hours
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => {return event.date})
   let wages = dates.map(element => wagesEarnedOnDate(employee, element))
    return wages.reduce(function(element, runningTotal) {
        return element + runningTotal
    })
}

function calculatePayroll(employees) {
    let wages = employees.map(employee => allWagesFor(employee))
    return wages.reduce(function(wage, runningTotal) {
        return wage + runningTotal
    })
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name)
}