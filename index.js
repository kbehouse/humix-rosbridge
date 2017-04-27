
//---------------------config for ros---------------------//
// Connecting to ROS 
var ROSLIB = require('roslib');

var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

ros.on('connection', function() {
console.log('Connected to websocket server.');

//call_service();

});

ros.on('error', function(error) {
console.log('Error connecting to websocket server: ', error);
    
});

ros.on('close', function() {
console.log('Connection to websocket server closed.');
});


//---------------------config for humix---------------------//
var HumixSense = require('humix-sense');
var Conv = require('./index');
var fs = require('fs');


var config = {
    "moduleName" : "humix-rosbridge",
    "commands" : ["robot_cmd"],
    "events" : ["robot_event"],
    "log" : {
        file : 'humix-rosbridge.log',
        fileLevel : 'info',
        consoleLevel : 'debug'
      }
};
l = console.log;

var humix = new HumixSense(config);
var hsm;
var logger;



// Service Client test
// ------------------

var robot_cmd_client = new ROSLIB.Service({
  ros : ros,
  name : '/robot_cmd',
  serviceType : 'humix_test/RobotCommand'
});


function call_robot_cmd(data){
    console.log('Call Serveice /robot_cmd')
    var req = new ROSLIB.ServiceRequest({
            cmd : data,
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

//---------------------Start for humix---------------------//
console.log('========= starting humix ===========');

humix.on('connection', function(humixSensorModule){
    hsm = humixSensorModule;

    logger = hsm.getLogger();
    logger.info('Communication with humix-sense is now ready.');

    hsm.on("robot_cmd", function (data) {
        logger.info('received robot_cmd data:'+data);

        call_robot_cmd(data);
    })


});