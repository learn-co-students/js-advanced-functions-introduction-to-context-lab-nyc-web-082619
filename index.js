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

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateTime){
    const dateTimeArray = dateTime.split(" ")
     employeeRecord.timeInEvents.push({
         type: "TimeIn",
         date: dateTimeArray[0],
         hour: parseInt(dateTimeArray[1])
     })
     return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTime){
    const dateTimeArray = dateTime.split(" ")
     employeeRecord.timeOutEvents.push({
         type: "TimeOut",
         date: dateTimeArray[0],
         hour: parseInt(dateTimeArray[1])
     })
     return employeeRecord
}

const adderReducer = (accumulator, currentValue) => accumulator + currentValue

function hoursWorkedOnDate(employeeRecord, date){
    const timeInHoursOnDate = employeeRecord.timeInEvents.filter(event => event.date === date).map(event => event.hour)
    const timeOutHoursOnDate = employeeRecord.timeOutEvents.filter(event => event.date === date).map(event => event.hour)
    return (timeOutHoursOnDate.reduce(adderReducer) - timeInHoursOnDate.reduce(adderReducer))/100
}

function wagesEarnedOnDate(employeeRecord, date){
    const hours = hoursWorkedOnDate(employeeRecord, date)
    return hours * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    const dateArray = [...new Set(employeeRecord.timeInEvents.map(event => event.date))]
    const wageArray = dateArray.map(date => wagesEarnedOnDate(employeeRecord, date))
    return wageArray.reduce(adderReducer)
}

function calculatePayroll(arrayOfRecords){
    const wageArray = arrayOfRecords.map(record => allWagesFor(record))
    return wageArray.reduce(adderReducer) 
}

function findEmployeeByFirstName(employees, firstName){
    return employees.filter(employee => employee.firstName === firstName)[0]
}