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


function createTimeInEvent(){


    
}
