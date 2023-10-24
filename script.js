document
  .getElementById("dataForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var description = document.getElementById("description").value;
    var amount = parseFloat(document.getElementById("amount").value);
    var currency = document.getElementById("currency").value;

    var requestData = {
      description: description,
      amount: amount,
      currency: currency,
    };

    var request = new XMLHttpRequest();
    request.open("POST", "https://fptestdb-fc20.restdb.io/rest/spending");
    request.setRequestHeader("x-apikey", "65295db25d470b4f4f0e6ae4");
    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 201) {
          console.log("Data saved successfully.");
          // Reset the form after successful submission
          document.getElementById("dataForm").reset();
        } else {
          console.error("Failed to save data. Status code: " + request.status);
        }
      }
    };

    request.send(JSON.stringify(requestData));

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  });
function handleApiResponse(error, response, body) {
  if (error) {
    console.error(error);
    return;
  }

  // Parse the JSON response into an array of objects
  var data = JSON.parse(body);

  // Create a table
  var table = document.createElement("table");
  table.id = "data-table";

  // Create table header row
  var headerRow = table.insertRow(0);

  for (var key in data[0]) {
    if (data[0].hasOwnProperty(key) && key !== "_id") {
      var headerCell = document.createElement("th");
      headerCell.innerHTML = key;
      headerRow.appendChild(headerCell);
    }
  }

  // Create table data rows
  for (var i = 0; i < data.length; i++) {
    var row = table.insertRow(i + 1);

    for (var key in data[i]) {
      if (data[i].hasOwnProperty(key) && key !== "_id") {
        var cell = row.insertCell();
        cell.innerHTML = data[i][key];
      }
    }
  }

  // Append the table to the data container
  var dataContainer = document.getElementById("data-container");
  dataContainer.appendChild(table);
}

// Make the API request
var options = {
  method: "GET",
  url: "https://fptestdb-fc20.restdb.io/rest/spending",
  headers: {
    "cache-control": "no-cache",
    "x-apikey": "65295db25d470b4f4f0e6ae4",
  },
};

// Use the Fetch API to make the request (modern way)
fetch(options.url, {
  method: options.method,
  headers: options.headers,
})
  .then((response) => response.text())
  .then((body) => handleApiResponse(null, null, body))
  .catch((error) => handleApiResponse(error, null, null));
