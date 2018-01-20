var config = {
    apiKey: "AIzaSyBiGscjoHQHxdmFOvLwapKv8_Nkm7jEeXQ",
    authDomain: "worklog-activity.firebaseapp.com",
    databaseURL: "https://worklog-activity.firebaseio.com",
    projectId: "worklog-activity",
    storageBucket: "",
    messagingSenderId: "507201500858"
  };
firebase.initializeApp(config);
var userData = firebase.database().ref("employee-info")

userData.on("child_added",
    function(snapshot){
        $("#table").append(createEntry(snapshot.val()))
    },
    function(err){
        console.log("There was and error retrieving the data")
    }    
)

function createEntry(snapshot){
    var startDate = moment([
        snapshot.start.getMonth(),
    ])
    console.log(startDate)
    var row = $("<tr>")
    var name = $("<td>")
    var start = $("<td>")
    var pay = $("<td>")
    var role = $("<td>")
    name.text(snapshot.name)
    start.text(snapshot.start)
    pay.text(snapshot.pay)
    role.text(snapshot.role)
    row.append(name, role, "<td>N/A</td>", pay, "<td>N/A</td>")
    return row;
}

  $("#submit").click(function(){
    event.preventDefault()
    console.log($("#input-name").val())
    var employeeName = $("#input-name").val().trim()
    var employeeStartDate = $("#input-date").val().trim()
    var employeePay = $("#input-pay").val().trim()
    var employeeRole = $("#input-role").val().trim()
    console.log(employeeName, employeeStartDate, employeePay, employeeRole)
    var setUserData = {
        name: employeeName,
        start: employeeStartDate,
        pay: employeePay,
        role: employeeRole,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }
    userData.push(setUserData)
    console.log(setUserData)
  })