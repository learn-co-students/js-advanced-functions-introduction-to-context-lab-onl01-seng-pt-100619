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
