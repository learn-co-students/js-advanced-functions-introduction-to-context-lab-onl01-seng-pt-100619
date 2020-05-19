// Your code here
function createEmployeeRecord(arr) {
    let testEmployee = {};
    testEmployee.firstName = arr[0];
    testEmployee.familyName = arr[1];
    testEmployee.title = arr[2];
    testEmployee.payPerHour = arr[3];
    testEmployee.timeInEvents = [];
    testEmployee.timeOutEvents = []
    return testEmployee
}

function createEmployeeRecords(arr) {
    const map = arr.map(employee => createEmployeeRecord(employee));
    return map
}

function createTimeInEvent(object, date) {
    let dateArray = date.split(" ")
    let event = {}
    event.type = "TimeIn";
    event.hour = parseInt(dateArray[1], 10);
    event.date = dateArray[0]
    object.timeInEvents.push(event)
    return object
}

function createTimeOutEvent(object, date) {
    let dateArray = date.split(" ")
    let event = {}
    event.type = "TimeOut";
    event.hour = parseInt(dateArray[1], 10);
    event.date = dateArray[0]
    object.timeOutEvents.push(event)
    return object
}

function hoursWorkedOnDate(object, date) {
    //find objects timeIn/timeOut events for specific date
    let startTime = object.timeInEvents.find(element => element.date === date)
    let endTime = object.timeOutEvents.find(element => element.date === date)
    // minus timeIn from Timeout to get total hours 
    let totalHours = (endTime.hour - startTime.hour) / 100;
    return totalHours
    //return hours worked
}

function wagesEarnedOnDate(object, date) {
    let hours = hoursWorkedOnDate(object, date);
    return hours * object.payPerHour
}

function allWagesFor(object) {
    let wages = object.timeInEvents.map(element => element.date)
                .map(date => wagesEarnedOnDate(object, date))
                .reduce((total, element) => total + element, 0)
    return wages
}

function findEmployeeByFirstName(arr, name) {
   let employee = arr.find(element => element.firstName === name)
   return employee
}

function calculatePayroll(arr) {
    let employeeWages = arr.map(element => allWagesFor(element))
                        .reduce((total, element) => total + element, 0)
    return employeeWages
}