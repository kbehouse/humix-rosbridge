
// Connecting to ROS 
var ROSLIB = require('roslib');

var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

ros.on('connection', function() {
console.log('Connected to websocket server.');

call_service();

});

ros.on('error', function(error) {
console.log('Error connecting to websocket server: ', error);
    
});

ros.on('close', function() {
console.log('Connection to websocket server closed.');
});




// Service Client test
// ------------------

var robot_cmd_client = new ROSLIB.Service({
  ros : ros,
  name : '/robot_cmd',
  serviceType : 'humix_test/RobotCommand'
});

function call_service(){
    console.log('Call Serveice /robot_cmd')
    var req = new ROSLIB.ServiceRequest({
            cmd : "ShakeHand",
        });


    robot_cmd_client.callService(req, function(res) {
        console.log('Result for service call on '
            + robot_cmd_client.name
            + ': '
            + res.success
            + ', '
            + res.msg);
    });
}