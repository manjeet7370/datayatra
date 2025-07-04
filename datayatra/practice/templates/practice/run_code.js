
document.getElementById("codeForm").addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("inside codeForm JS");
    const code = document.getElementById("user_code").value;
    const formData = new FormData();
    formData.append("user_code", code);

    fetch("{% url 'practice:run_code' %}", {
    method: "POST",
    headers: {
        "X-CSRFToken": getCookie("csrftoken")
    },
    body: formData
    })
    .then(response => response.json())
    .then(data => {
    console.log(data.result)
    console.log(data.columns);
    
    header = document.createElement("h2");
    header.innerText = "Output";
    status_msg = document.createElement("h3");
    status_msg.innerText = data.status.message;
    // create table
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const headerRow = document.createElement("tr");
    data.columns.forEach(column => {
        const th = document.createElement("th");
        th.innerText = column;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    data.result.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
        const td = document.createElement("td");
        td.innerText = cell;
        tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
    // Expected output table
    const expectedTable = document.createElement("table");
    const expectedThead = document.createElement("thead");
    const expectedTbody = document.createElement("tbody");
    const expectedHeaderRow = document.createElement("tr");
    data.tc_columns.forEach(column => {
        const th = document.createElement("th");
        th.innerText = column;
        expectedHeaderRow.appendChild(th);
    });
    expectedThead.appendChild(expectedHeaderRow);
    data.tc_result.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
        const td = document.createElement("td");
        td.innerText = cell;
        tr.appendChild(td);
        });
        expectedTbody.appendChild(tr);
    });
    expectedTable.appendChild(expectedThead);
    expectedTable.appendChild(expectedTbody);
    // Append the output table and expected output table to the resultDiv
    document.getElementById("resultDiv").innerHTML = ""; // Clear previous results
    document.getElementById("resultDiv").appendChild(header); // Append the header
    document.getElementById("resultDiv").appendChild(status_msg); // Append the status message
    document.getElementById("resultDiv").appendChild(table); // Append the new table
    header2 = document.createElement("h2");
    header2.innerText = "Expected Output";
    document.getElementById("resultDiv").appendChild(header2); // Append the expected output header
    document.getElementById("resultDiv").appendChild(expectedTable); // Append the expected output table
    })
    .catch(error => {
    console.error("Error:", error);
    });
});

// CSRF helper
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
        }
    }
    }
    return cookieValue;
}
