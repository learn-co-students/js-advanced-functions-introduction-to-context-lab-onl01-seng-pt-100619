function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecord, dateTime){
    const [date, time] = dateTime.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    })

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTime){
    const [date, time] = dateTime.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    })

    return employeeRecord 
}

function hoursWorkedOnDate(employeeRecord, formattedDate){
    const timeIn = employeeRecord.timeInEvents.find(workDate => workDate.date === formattedDate)
    const timeOut = employeeRecord.timeOutEvents.find(workDate => workDate.date === formattedDate)

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, formattedDate){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, formattedDate)     
    const payOwed =  hoursWorked * employeeRecord.payPerHour
    return payOwed
}

function allWagesFor(employeeRecord){
    const workDates = employeeRecord.timeInEvents.map(workDate => workDate.date)
    
    return workDates.reduce((accumulator, date) => {
        return accumulator + wagesEarnedOnDate(employeeRecord, date)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(empRecordsArray){
    const allWages = empRecordsArray.map(emp => allWagesFor(emp))
    return allWages.reduce((wage, total) => wage + total)
}