createEmployeeRecord = (arr) => {
  const info = {
    firstName : arr[0],
    familyName : arr[1],
    title : arr[2],
    payPerHour : arr[3],
    timeInEvents : [],
    timeOutEvents : []
  }
  return info
}

function createEmployeeRecords(arr){
  const returnArr = [];
  arr.forEach((employee)=>{
    returnArr.push(createEmployeeRecord(employee));
  })
  return returnArr;
}

function createTimeInEvent(record,dateStamp) {
  const fullDate = dateStamp.split(" ");
  const date =  fullDate[0];
  const time = fullDate[1];
  const info = {
    type : "TimeIn",
    hour : parseInt(time),
    date : date
  };
  record.timeInEvents.push(info);
  return record;
}

function createTimeOutEvent(record,dateStamp){
  const fullDate = dateStamp.split(" ");
  const date =  fullDate[0];
  const time = fullDate[1];
  const info = {
    type : "TimeOut",
    hour : parseInt(time),
    date : date
  };
  record.timeOutEvents.push(info);
  return record;
}

function hoursWorkedOnDate(record, dateStamp) {
  let hoursWorked = 0;
  const dayIn =record.timeInEvents.find((date) => {return date.date === dateStamp});
  const dayOut = record.timeOutEvents.find((date) =>{return date.date === dateStamp});
  hoursWorked = (dayOut.hour - dayIn.hour)/100;
  return hoursWorked;
}

function wagesEarnedOnDate(record, dateStamp) {
  return hoursWorkedOnDate(record,dateStamp) * record.payPerHour;
}

function allWagesFor(record) {
  let totalWages = 0;
  record.timeInEvents.forEach((timeIn)=>{
       totalWages += wagesEarnedOnDate(record,timeIn.date);
       //console.log("Total Wages: ===================================="+totalWages)
  })
  return totalWages;
}

function findEmployeeByFirstName(arr,firstName) {
  return arr.find((employee)=>{
    return employee.firstName === firstName;
  })
}

function calculatePayroll(arr) {
  let totalWages = 0;
  arr.forEach((employee)=>{
    totalWages += allWagesFor(employee);
  })
  return totalWages;
}



