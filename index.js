/* Your Code Here */
function createEmployeeRecord(array) {
    const eRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };

    return eRecord;
}

function createEmployeeRecords(array) {
    const eRecords = array.map(employee => createEmployeeRecord(employee));
    
    return eRecords;
}

function createTimeInEvent(date) {
    const splitDate = date.split(' ');
    const event = {
        type: "TimeIn",
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    }
    
    this.timeInEvents.push(event);
    return this;
}

function createTimeOutEvent(date) {
    const splitDate = date.split(' ');
    const event = {
        type: "TimeOut",
        hour: parseInt(splitDate[1]),
        date: splitDate[0]
    }

    this.timeOutEvents.push(event);
    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvents = this.timeInEvents;
    const timeOutEvents = this.timeOutEvents;

    for (let i = 0; i < timeInEvents.length; i++) {
        if (timeInEvents[i].date === date)
            return(timeOutEvents[i].hour - timeInEvents[i].hour) / 100;
    }
    
    return 0;
}

function wagesEarnedOnDate(date) {
    const wages = hoursWorkedOnDate.call(this, date) * parseInt(this.payPerHour);
    return wages;
}

function findEmployeeByFirstName(srcArray, firstName) {
    const employee = srcArray.find(employee => employee.firstName === firstName);
    return employee;
}

function calculatePayroll(srcArray) {
    const eWages = srcArray.map(employee => allWagesFor.call(employee));
    const payroll = eWages.reduce((total, wage) => total + wage);
    return payroll;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}