// Selectors and global variables
var productNameInput = document.getElementById("bookmarkName");
var productUrlInput = document.getElementById("bookmarkUrl");
var boxModal = document.querySelector(".box-info");
var closeBtn = document.getElementById("closeBtn");

var productList = [];

// Initialize product list from localStorage
if (localStorage.getItem("productContainer") !== null) {
    productList = JSON.parse(localStorage.getItem("productContainer"));
    displayData();
}

// Add product function
function addbook() {
    if (validationInputs(productNameInput, 'msgName') && validationInputs(productUrlInput, 'msgUrl')) {
        var product = {
            name: productNameInput.value,
            url: productUrlInput.value
        };

        productList.push(product);

        localStorage.setItem("productContainer", JSON.stringify(productList));
        displayData();
        clearForm();
    } else {
        // Show the modal if validation fails
        boxModal.classList.remove('d-none');
    }
}
// Clear form inputs
function clearForm() {
    productNameInput.value = '';
    productUrlInput.value = '';
}

// Display data in table
function displayData() {
    var tableContent = "";
    for (var i = 0; i < productList.length; i++) {
        tableContent += createRow(i);
    }
    document.getElementById("tableContent").innerHTML = tableContent;
}

// Create a row for the table
function createRow(i) {
    return `
<tr>
    <td>${i + 1}</td>
    <td>${productList[i].name}</td>
    <td> 
        <a href="${productList[i].url}" target="_blank" class="btn btn-sm btn-success p-2 rounded-3">
            <i class="fa-solid fa-eye"></i> Visit 
        </a> 
    </td>
    <td>
        <button onclick="deleteItem(${i})" class="btn btn-sm btn-danger p-2 rounded-3">
            <i class="fa-solid fa-trash-can"></i> Delete
        </button>
    </td>   
</tr>
`;
}

// Delete item from list
function deleteItem(index) {
    productList.splice(index, 1);
    localStorage.setItem("productContainer", JSON.stringify(productList));
    displayData();
}

// Validation function
function validationInputs(element, msgId) {
    var regex = {
        bookmarkName: /^\w{3,}(\s+\w+)*$/, // At least 3 characters
        bookmarkUrl: /^(https?:\/\/)?(www\.)?[\w-]+\.\w{2,}(:\d+)?(\/[\w._-]*)*\/?$/
    };
    var text = element.value.trim();
    var msg = document.getElementById(msgId);

    if (regex[element.id].test(text)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        msg.classList.remove("d-none");
        return false;
    }
}

// Event listener for close button
closeBtn.addEventListener('click', function () {
    boxModal.classList.add('d-none'); // Hide the modal
});
