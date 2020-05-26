// Your code here

// let allEmployeeRecords = [];

function createEmployeeRecord(a){
    let employeeRecord = {
        firstName: a[0],
        familyName: a[1],
        title: a[2],
        payPerHour: a[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    // allEmployeeRecords.push(employeeRecord)
    return employeeRecord
}

function createEmployeeRecords(employeesArray){
    let employeesObjects = []
    employeesArray.map( function(employee) {employeesObjects.push(createEmployeeRecord(employee))})
    // allEmployeeRecords.concat(employeesObjects)
    return employeesObjects;
}

function createTimeInEvent(employeeRecord, time){
    // let timeIn = 
    let [date, hour] = time.split(" ")

        employeeRecord.timeInEvents.push({
            type: "TimeIn",
            hour: parseInt(hour, 10),
            date
        })
    
    return employeeRecord;
    
}

function createTimeOutEvent(employeeRecord, time){
    // let timeOut = 
    let [date, hour] = time.split(" ") 
    // I can create an employee record from here and update it 
    // and/or find it? how do i find an employee record in the employee array? find or create 
    // if found then update the clock in/out
    // let eRecord = allEmployeeRecords.find(record => record.firstName === employeeRecord.firstName) // I dont currently update the records array on timin and timeout functions
        employeeRecord.timeOutEvents.push({
            type: "TimeOut",
            hour: parseInt(hour,10),
            date // destructuring
        })
    // else create and update with clock in/out
    // let newOutRecord = createEmployeeRecord(newRecord)
    // how do i update the object? it has a timein and timeout key so they are the same record for in and out or for the day one record per day
    
    
    return employeeRecord
    // employeeRecord.timeOutEvents = timeOut.timeOutEvents
    // return employeeRecord.timeOutEvents;
}

// how do i access the hour from here id only the date is given? I dont have a database/collection of records like @@all
function hoursWorkedOnDate(employeeRecord, date){

    const timeIn = employeeRecord.timeInEvents.find(function(timeEvent){
        return timeEvent.date === date
    })

    const timeOut = employeeRecord.timeOutEvents.find(function(timeEvent){
        return timeEvent.date === date
    })

    const hours = (timeOut.hour - timeIn.hour) / 100
    return hours

}

function wagesEarnedOnDate(employeeRecord, date){
    // let eRecord = allEmployeeRecords.filter(record => record.firstName === employeeRecord.firstName) // we found the records
    let dateHours = hoursWorkedOnDate(employeeRecord, date)
    let perHour = employeeRecord.payPerHour
    let total = dateHours * perHour
    return total;
}

// first find all records
// calculate the wages earned for each of the records found
// the wages are extracted from the timin and timeout keys
// on the hours work on date we only use the first item of the timein and timeout events keys
// we should instead iterate over these arrays
// we need to extract the date for each day to call the wagesearnedondate function on each day from the multiple day record
function allWagesFor(employeeRecord){
    let dates = employeeRecord.timeInEvents.map((clockIn)=>{
        return clockIn.date
    })

    let totalWages = dates.reduce((acc, date)=>{
        return acc + wagesEarnedOnDate(employeeRecord,date)
    }, 0)
   
    // employeeRecord.timeInEvents.map(function(timeInEvent){timesIn.push(timeInEvent.hour)}) 
    // employeeRecord.timeOutEvents.map(function(timeOutEvent){ timesOut.push(timeOutEvent.hour)})
    // let hours = []
    //     for(let i = 0; i < timesIn.length; i++){
    //         hours.push(timesOut[i] - timesIn[i]) // we can iterate over 
    //     }
    // let hoursWorked = []
    // hours.map(function(hour) {hoursWorked.push(hour / 100|0)})

    // let totalHours = hoursWorked.reduce((total, hour) => total + hour)
    // let payPerHour = employeeRecord.payPerHour
    // let totalWages = totalHours * payPerHour
    return totalWages;
    
    

    // let wagesPerDay = wagesEarnedOnDate(employeeRecord)

//    allRecords.reduce((wages, record) => wages + wagesEarnedOnDate(record))

   
}


function findEmployeeByFirstName(allEmployeeRecords, name){
    let loki = allEmployeeRecords.find(record => record.firstName === name)
    return loki
}




let calculatePayroll = function(records){

    // return records.reduce((acc, employee)=> {
    //     return acc += allWagesFor(employee)
    // }, 0)


    let wagesArr = records.map(function(record){return allWagesFor(record)})  // first make an array with all wages for each employee

    let expense = wagesArr.reduce(function(memo, wage){return memo += wage}, 0)

    return expense;

 }