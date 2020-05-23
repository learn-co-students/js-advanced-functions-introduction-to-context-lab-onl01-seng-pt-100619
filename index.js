// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// function createEmployeeRecords(arrays){
//     let recordCollection = {}

//     for(i=0; i < arrays.length; i++){
//         let obj = createEmployeeRecord(arrays[i]);
//         return recordCollection << obj
//     }
// }

function createEmployeeRecords(arrays){
    return arrays.map(function(array){
        return createEmployeeRecord(array);
    })
}

function createTimeInEvent(array,timeIn){
    let [date, time] = timeIn.split(' ');

    // let newRecord = createEmployeeRecord(array)

    array.timeInEvents.push(
        {type: "TimeIn",
         hour: parseInt(time, 10),
         date}
    )

    return array;
    
}

function createTimeOutEvent(array,timeOut){
    let [date, time] = timeOut.split(' ');

    // let newRecord = createEmployeeRecord(array)

    array.timeOutEvents.push(
        {type: "TimeOut",
        hour: parseInt(time, 10),
        date}
    )

    return array
}

function hoursWorkedOnDate(employee, soughtDate){
    let timedIn = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let timedOut = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    let hrWorked = timedOut.hour - timedIn.hour;
    return hrWorked/100
}


function wagesEarnedOnDate(employee,soughtDate){
    let hoursWorked = hoursWorkedOnDate(employee, soughtDate)
    return employee.payPerHour * hoursWorked
}

function allWagesFor(employee){
    let initialValue = 0;
    
    let datesWorked = employee.timeInEvents.map(function(e){
        return e.date;
    })

    let totalPayOut = datesWorked.reduce(function(accumulator, day){
        return accumulator + wagesEarnedOnDate(employee, day);
    }, initialValue)

    return totalPayOut;
}

function findEmployeeByFirstName(employees,firstname){
    return employees.find(function(employee){
        return employee.firstName === firstname;
    });
}


function calculatePayroll(employees){
    let initialValue = 0
    return employees.reduce(function(accumulator, employee){
        return accumulator + allWagesFor(employee);
    }, initialValue);
}
