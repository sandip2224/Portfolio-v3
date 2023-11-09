function fetchTableData() {
    var selectedTable = document.getElementById("tableSelector").value;
    if (!selectedTable) {
        return;
    }

    var loading = document.getElementById("loading");
    var error = document.getElementById("error");
    var tableData = document.getElementById("tableData");

    loading.style.display = "block";
    error.style.display = "none";
    tableData.style.display = "none";

    fetch("YOUR_API_BASE_URL/" + selectedTable) // Replace YOUR_API_BASE_URL with your actual API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => renderTable(data))
        .catch(error => {
            loading.style.display = "none";
            error.style.display = "block";
            console.error('Error fetching data:', error);
        });
}

function renderTable(data) {
    var loading = document.getElementById("loading");
    var error = document.getElementById("error");
    var tableData = document.getElementById("tableData");

    loading.style.display = "none";
    error.style.display = "none";

    var tableHeaderRow = document.getElementById("tableHeaderRow");
    var tableBody = document.getElementById("tableBody");

    tableHeaderRow.innerHTML = "";
    tableBody.innerHTML = "";

    var headers = Object.keys(data[0]);

    headers.forEach(function (header) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(header));
        tableHeaderRow.appendChild(th);
    });

    data.forEach(function (row) {
        var tr = document.createElement("tr");
        headers.forEach(function (header) {
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(row[header]));
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });

    tableData.style.display = "block";
}
