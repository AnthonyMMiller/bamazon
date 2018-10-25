//================================= Required ==============================//

var Table = require('cli-table');
var mysql = require('mysql');
var inquirer = require('inquirer');

//=================================Connection to SQL database===============================//

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "balla456",
	database: "bamazon"
});

connection.connect(function (err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	inventory();
});

//=================================Inventory===============================//

function inventory() {

	// Create table 
	var table = new Table({
		head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
		colWidths: [10, 30, 30, 30, 30]
	});

	listInventory();

	function listInventory() {

		//Variable creation from database

		connection.query("SELECT * FROM products", function (err, res) {
			for (var i = 0; i < res.length; i++) {

				var itemId = res[i].id,
					productName = res[i].product_name,
					departmentName = res[i].department_name,
					price = '$ ' + res[i].price,
					stockQuantity = res[i].stock_quantity;

				table.push(
					[itemId, productName, departmentName, price, stockQuantity]
				);
			}
			console.log("");
			console.log("_______________________________________________-Welcome! Current Bamazon Inventory- ________________________________________________");
			console.log("");
			console.log(table.toString());
			console.log("");
			selectionPrompt();
		});
	}
}

//================================= Restart prompt for more purchases ===============================//


function restart() {

	inquirer.prompt([{

		type: "confirm",
		name: "confirm",
		message: "Would you like to purchase another product?",
		default: true

	}]).then(function (user) {
		if (user.confirm === true) {
			inventory();
		} else {
			console.log("Thank you! Come back soon!");
		}
	});
}

//=================================Item selection and Quantity desired===============================

function selectionPrompt() {

	inquirer.prompt([{

			type: "input",
			name: "inputId",
			message: "Please enter the ID number of the item you would like to purchase.",
		},
		{
			type: "input",
			name: "inputNumber",
			message: "How many units of this item would you like to purchase?",

		}
	]).then(function (userPurchase) {

		//connect to database to find stock in database. If user quantity input is greater than stock, decline purchase.

		connection.query("SELECT * FROM products WHERE id=?", userPurchase.inputId, function (err, res) {
			for (var i = 0; i < res.length; i++) {

				if (userPurchase.inputNumber > res[i].stock_quantity) {

					console.log("===================================================");
					console.log("Sorry! Out of stock. Please check back later :(");
					console.log("===================================================");
					inventory();

				} else {
					//list item information for user for confirm prompt
					console.log("===================================");
					console.log("It looks like we can fulfull your order :)");
					console.log("===================================");
					console.log("You've selected:");
					console.log("Item: " + res[i].product_name);
					console.log("Department: " + res[i].department_name);
					console.log("Price: " + res[i].price);
					console.log("Quantity: " + userPurchase.inputNumber);
					console.log("Total: $" + res[i].price * userPurchase.inputNumber);
					console.log("===================================");

					var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
					var purchaseId = (userPurchase.inputId);
					//console.log(newStock);
					confirmPrompt(newStock, purchaseId);
				}
			}
		});
	});
}

//=================================Confirm Purchase===============================//

function confirmPrompt(newStock, purchaseId) {

	inquirer.prompt([{

		type: "confirm",
		name: "confirmPurchase",
		message: "Is this the correct item and quantity you would like to purchase?",
		default: true

	}]).then(function (userConfirm) {
		if (userConfirm.confirmPurchase === true) {

			//if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

			connection.query("UPDATE products SET ? WHERE ?", [{
				stock_quantity: newStock
			}, {
				id: purchaseId
			}], function (err, res) {});
			console.log("Transaction completed. Thank you!");
			restart();
		} else {
			console.log("Maybe next time!");
			restart();
		}
	});
}