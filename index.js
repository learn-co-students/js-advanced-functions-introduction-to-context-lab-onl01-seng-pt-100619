// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        //firstName: firstName
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(function (employee) {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employeeRecord, datestamp) {
    //create an object
    let [date, hour] = datestamp.split(' ')
    const clockIn = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    }
    //add the object of timeInEvents
    employeeRecord.timeInEvents.push(clockIn)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, datestamp) {
    //create an object
    let [date, hour] = datestamp.split(' ')
    const clockOut = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    }
    //add the object of timeInEvents
    employeeRecord.timeOutEvents.push(clockOut)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    //find the timeEvent in employeeRecord's timeEvents
    const timeIn = employeeRecord.timeInEvents.find(function (timeIn) {
        return timeIn.date === date
    })
    //save for timeout
    const timeOut = employeeRecord.timeOutEvents.find(function (timeOut) {
        return timeOut.date === date
    })

    //using that, we can then calculate hours worked
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked

}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    //find available dates
    const dates = employeeRecord.timeInEvents.map(function (event) {
        return event.date
    })

    return dates.reduce(function (accumulator, date) {
        return accumulator + wagesEarnedOnDate(employeeRecord, date)

    }, 0)
    // let total = 0

    // dates.map(function (date) {
    //     total += wagesEarnedOnDate(employeeRecord, date)
    // })
    // return total
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function (employee) {
        return employee.firstName === firstName
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function (accumulator, employee) {
        return accumulator + allWagesFor(employee)
    }, 0)
}