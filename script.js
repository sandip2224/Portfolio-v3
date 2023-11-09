var currentPage = 1;
var itemsPerPage = 10; // Adjust the number of items per page as needed

function fetchTableData() {
    var selectedTable = $("#tableSelector").val();
    if (!selectedTable) {
        return;
    }

    $("#loading").show();
    $("#error").hide();
    $("#tableData").hide();

    $.ajax({
        url: "YOUR_API_BASE_URL/" + selectedTable,
        type: "GET",
        data: { page: currentPage, limit: itemsPerPage },
        success: function (data) {
            renderTable(data.results); // Assuming the server returns paginated results
            updatePagination(data.previous, data.next); // Assuming the server returns previous and next page URLs
        },
        error: function () {
            $("#loading").hide();
            $("#error").show();
        }
    });
}

function renderTable(data) {
    // Render the table based on the received data
    // Your existing renderTable function code here
}

function updatePagination(previousPage, nextPage) {
    var prevButton = $(".pagination").find(".page-item").first();
    var nextButton = $(".pagination").find(".page-item").last();

    if (previousPage === null) {
        prevButton.addClass("disabled");
    } else {
        prevButton.removeClass("disabled");
    }

    if (nextPage === null) {
        nextButton.addClass("disabled");
    } else {
        nextButton.removeClass("disabled");
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchTableData();
    }
}

function nextPage() {
    currentPage++;
    fetchTableData();
}
