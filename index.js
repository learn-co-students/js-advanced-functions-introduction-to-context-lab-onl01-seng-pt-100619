// populates a record from an Array
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

// process an Array of Arrays into an Array of employee records
 let createEmployeeRecords = function(employeeData){
     return employeeData.map(function(row) {
         return createEmployeeRecord(row)
     })
 }

//  function addFullNameToEmployees(empCollection){
//     empCollection.forEach(function(e){
//       e.fullName = `${e.firstName} ${e.familyName}`
//     })
//   }
   
//   addFullNameToEmployees([
//     {firstName: "Byron", familyName: "Karbitii"},
//     {firstName: "Luca", familyName: "Tuexedensis"}
//   ])

let createTimeInEvent = function(employee, dateStamp){
    //convert time : hour, date
    let [date, hour] = dateStamp.split(' ')

    // push/add object with keys to the timeInEvents array on the record Object
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    //convert time : hour, date
    let [date, hour] = dateStamp.split(' ')

    // push/add object with keys to the timeInEvents array on the record Object
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employee
}

let hoursWorkedOnDate = function(employee, formDate){
    debugger
    //given a date..find the number of hours elapsed b/w (timeInEvent-timeOutEvent)
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === formDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === formDate
    })
    // returns:  hours worked, an integer
    return (outEvent.hour - inEvent.hour) / 100

}

let wagesEarnedOnDate = function(employee, formDate){
    // Using hoursWorkedOnDate:
    // multiply the hours by the record's payRate to determine amount owed.
    // Amount should be returned as a number.

    let amountOwed = hoursWorkedOnDate(employee, formDate) * employee.payPerHour
    return parseInt(amountOwed)
}

let allWagesFor = function(employee){
    // uses wagesEarnedOnDate
    //accumulate value of all dates worked by the employee
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)},0)

    //returns pay owed for ALL dates: as integer
    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(e){
        return e.firstName === firstName
    })
}

let calculatePayroll = function(employeeRecordsArray){
    return employeeRecordsArray.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
