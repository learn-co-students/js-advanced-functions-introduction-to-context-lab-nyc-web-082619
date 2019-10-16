// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(arr) {
  return arr.map(e => createEmployeeRecord(e));
}

function createTimeInEvent(employee, timeIn) {
  const dateArr = timeIn.split(" ");
  const time = {
    type: "TimeIn",
    hour: +dateArr[1],
    date: dateArr[0]
  };
  employee.timeInEvents.push(time);
  return employee;
}

function createTimeOutEvent(employee, timeOut) {
  const dateArr = timeOut.split(" ");
  const time = {
    type: "TimeOut",
    hour: +dateArr[1],
    date: dateArr[0]
  };
  employee.timeOutEvents.push(time);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const ind = employee.timeInEvents.findIndex(e => e.date === date);
  return (
    (employee.timeOutEvents[ind].hour - employee.timeInEvents[ind].hour) / 100
  );
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((sum, n) => {
    return sum + wagesEarnedOnDate(employee, n.date);
  }, 0);
}

function calculatePayroll(arr) {
  return arr.reduce((sum, i) => sum + allWagesFor(i), 0);
}

function findEmployeeByFirstName(arr, name) {
  return arr.find(e => e.firstName === name);
}
