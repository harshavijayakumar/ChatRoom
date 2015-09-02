var client= require('socket.io').listen(8080).sockets;

client.on('connection',function(socket)
{
console.log('someone has connected');

sendStatus=function(s)
{
socket.emit('status',s);
};

//emit all messages

//socket.emit('output',{ "name":"Alex","message":"hello"})
var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);


if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  
 
  db.each("SELECT name AS id, message,sqltime FROM chat", function(err, row) {
    console.log(row.id + ": " + row.message + "--->"+row.timesql);
	socket.emit('output',row);
	
  });
});

db.close();

// end of change

socket.on('input',function(data)
{
console.log(data);
var name=data.name,
message=data.message;

whitespace=/^\s*$/;
if
(whitespace.test(name)|| whitespace.test(message))
{

sendStatus('Please enter proper message and name');

}

else{

console.log(name,message);


var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);


if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  
  var sqltime = new Date().toLocaleString()
        var stmt = db.prepare("INSERT INTO chat VALUES ('"+name+"','"+message+"','"+sqltime+"')");
		
		client.emit('output',{id: name, message: message, sqltime: sqltime})
  
stmt.run();
stmt.finalize();

/*db.each("SELECT name AS id, message,sqltime FROM chat", function(err, row) {
    console.log(row.id + ": " + row.message + "--->"+row.sqltime);
	client.emit('output',row);
		});
*/
});


db.close();


sendStatus('Message sent');

}
});

});