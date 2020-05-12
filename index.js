// Your code here


function createEmployeeRecord(a){
    return {
        firstName: a[0],
        familyName: a[1],
        title: a[2],
        payPerHour: a[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesArray){
    let employeesObjects = []
    employeesArray.map( function(employee) {employeesObjects.push(createEmployeeRecord(employee))})
    return employeesObjects;
}

function createTimeInEvent(employeeRecord, time){
    return { timeInEvents: [{
            type: "TimeIn",
            date: time.split(" ")[0],
            hour: parseInt(time.split(" ")[1])
        }]
    }
}

function createTimeOutEvent(employeeRecord, time){
    return { 
        timeOutEvents: [{
            type: "TimeOut",
            date: time.split(" ")[0],
            hour: parseInt(time.split(" ")[1])
        }]
    }
}

function hoursWorkedOnDate(employeeRecord, time){
    let checkIn = createTimeInEvent(employeeRecord, time)
    let checkOut = createTimeOutEvent(employeeRecord, time)
    let totalHours = parseInt(checkOut.timeOutEvents.hour) - parseInt(checkIn.timeInEvents.hour)
                        // 1700                                     //1500
    let hours = totalHours
    return hours ;
}

function calculatePayroll(){

}


