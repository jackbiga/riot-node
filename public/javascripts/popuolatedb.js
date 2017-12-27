const https = require('https');
var http = require('http');
var url = require('url');
var mysql = require('mysql');
var express = require('express');
var app = express();

var Champion = require('../../models/champion')
var Item = require('../../models/item')

var obj="";

var riotApiKey = "RGAPI-68daf7f4-e279-4c95-b87f-f649b2326c1e";

//Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://gbigarella:Aspire5738zg@ds161306.mlab.com:61306/riot-db'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function loadDBchamps(arr){

	arr.forEach(element => {
		var champion = new Champion({
            id: element.id,
            champion_key: element.key,
            name: element.name,
            title: element.title
        });

        champion.save(function(err) {
            if (err) return handleError(err);
            console.log('Champion saved: '+element.name);
        });
    });
    console.log('All Champions have been saved!');

}

function loadDBitems(arr){
	arr.forEach(element => {
		var item = new Item({
            id: element.id,
            plaintext: element.plaintext,
            description: element.description,
            name: element.name
        });

        item.save(function(err) {
            if (err) return handleError(err);
            console.log('Item saved: '+element.name);
        });
    });
    console.log('All Items have been saved!');
}

function UpdateChampionList(){
	https.get('https://euw1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key='+riotApiKey, (resp) => {
		  let data = '';
		 
		  // A chunk of data has been recieved.
		  resp.on('data', (chunk) => {
			data += chunk;
		  });
		 
		  // The whole response has been received. Print out the result.
		  resp.on('end', () => {
				obj  = JSON.parse(data).data; 
				var arr = Object.values(obj);
				arr.forEach(element => {
					console.log("-read- [id: "+element.id+" ,name: "+element.name+"]");
				});
				loadDBchamps(arr);
		  });
		 
		}).on("error", (err) => {
		  console.log("Error: " + err.message);
		  return 0;
	});
}


function UpdateItemList(){
	https.get('https://euw1.api.riotgames.com/lol/static-data/v3/items?locale=en_US&api_key='+riotApiKey, (resp) => {
		  let data = '';
		 
		  // A chunk of data has been recieved.
		  resp.on('data', (chunk) => {
			data += chunk;
		  });	
		 
		  // The whole response has been received. Print out the result.
		  resp.on('end', () => {
				obj  = JSON.parse(data).data; 
				var arr = Object.values(obj);
				arr.forEach(element => {
					console.log("-read- element: "+element);
				});
				loadDBitems(arr);
		  });
		 
		}).on("error", (err) => {
		  console.log("Error: " + err.message);
		  return 0;
	});
}


function getChamps(res){
	console.log("function getChamps");
	var sql = "SELECT * FROM champions";
	con.query(sql, function (err, result, fiels) {
		if (err) throw err;
		var data = "<table><tr><td>ID</td><td>Name</td><td>Title</td></tr>";
		result.forEach(element => {
			data += "<tr><td>"+element.id+"</td><td>"+element.name+"</td><td>"+element.title+"</td></tr>";
		});
		data += "</table>";

		res.write(data);
		res.end();
	});
}

//INIZIO DEL PROGRAMMA
var update = true;
if(update){
	//console.log("\nUpdating champions list...");
	//UpdateChampionList();

	console.log("\nUpdating items list...");
	UpdateItemList();
}
else{
	console.log("\nChampions list already updated");
	console.log("\nItems list already updated");
}

console.log('Closing program...');