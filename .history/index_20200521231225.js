// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

 function createEmployeeRecords(employeeArrays){
    return employeeArrays.map(function(employee){
       return createEmployeeRecord(employee)
    })
}


function createTimeInEvent(employeeRecord, dateStamp){
    // create and object
    let [date, hour] = dateStamp.split(' ')
    const clockIn = {
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
    }
    //add the object to timeInEvents
    employeeRecord.timeInEvents.push(clockIn)
    return employeeRecord

}


function createTimeOutEvent(employeeRecord, dateStamp){
    // create and object
    let [date, hour] = dateStamp.split(' ')
    const clockOut = {
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
    }
    //add the object to timeOutEvents
    employeeRecord.timeOutEvents.push(clockOut)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    const TimeIn = employeeRecord.timeInEvents.find(function(TimeIn){
       return TimeIn.date === date
    })
    const timeOut = employeeRecord.timeOutEvents.find(function(timeOut){
        return timeOut.date === date 
     })

    //using that, we can calc hours worked
   const hoursWorked = (timeOut.hour - TimeIn.hour) / 100
   return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour

}

function allWagesFor(employeeRecord){
    // find the available date 
    const dates = employeeRecord.timeInEvents.map(function(event){
       return event.date
    })
    
   let total = 0 

   dates.map(function(date){
    total += wagesEarnedOnDate(employeeRecord, date)       
   })
    
   return total 
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(employeeRecord){
        return employee.firstName === firstName
    })

}

function calculatePayroll(employeeRecords){ 
    return employeeRecords.reduce(function(accumulator, employee){
       return accumulator + allWagesFor(employee)
    }, 0)

}