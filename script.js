function fetchTableData() {
    var selectedTable = $("#tableSelector").val();
    if (!selectedTable) {
        return;
    }

    $("#loading").show();
    $("#error").hide();
    $("#tableData").hide();

    $.ajax({
        url: "YOUR_API_BASE_URL/" + selectedTable, // Replace YOUR_API_BASE_URL with your actual API endpoint
        type: "GET",
        success: function (data) {
            renderTable(data);
        },
        error: function () {
            $("#loading").hide();
            $("#error").show();
        }
    });
}

function renderTable(data) {
    $("#loading").hide();
    $("#error").hide();

    $("#tableHeaderRow").empty();
    $("#tableBody").empty();

    var headers = Object.keys(data[0]);
    var headerRow = $("#tableHeaderRow");
    headers.forEach(function (header) {
        headerRow.append("<th>" + header + "</th>");
    });

    var tableBody = $("#tableBody");
    data.forEach(function (row) {
        var tableRow = "<tr>";
        headers.forEach(function (header) {
            tableRow += "<td>" + row[header] + "</td>";
        });
        tableRow += "</tr>";
        tableBody.append(tableRow);
    });

    $("#tableData").show();
}
