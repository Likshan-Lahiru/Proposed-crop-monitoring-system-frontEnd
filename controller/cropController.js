const fieldIds = $('.field-id');
const logIds = $('.log-id');
let next_crop_id;

initialize();

function initialize() {
    setTimeout(() => {
       loadCropList();
        loadCrop();
        loadNextIid();
    }, 1000);
}


$("#update-crop").on('click', () => {
    document.querySelectorAll('.update-row').forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            const editButton = row.querySelector('.edit-row');
            const editables = row.querySelectorAll('.editable');

            // Disable editing, remove highlighting, and get new data
            const updatedData = {};
            editables.forEach(cell => {
                if (cell.classList.contains('field-id-dropdown')) {
                    const dropdown = cell; // Get the dropdown
                    const selectedValue = dropdown.value; // Get selected value
                    const textCell = cell.previousElementSibling; // Get the text cell
                    textCell.innerText = selectedValue; // Update the text cell
                    dropdown.style.display = 'none'; // Hide the dropdown
                    updatedData.fieldId = selectedValue; // Store updated fieldId
                } else {
                    const key = cell.getAttribute('data-key'); // Use data-key for dynamic mapping
                    updatedData[key] = cell.innerText.trim(); // Trim to remove excess spaces
                    cell.contentEditable = false; // Disable editing for other cells
                }
            });

            row.classList.remove('highlight'); // Remove highlight
            button.style.display = 'none'; // Hide Update button
            editButton.style.display = 'inline-block'; // Show Edit button

            console.log('Sending updated data to the server:', updatedData);

            // Send updated data to the server
            let jwtToken = localStorage.getItem('jwtToken');
            $.ajax({
                url: `http://localhost:8080/greenShadow/api/v1/crop/${updatedData.commonName}`, // Adjust endpoint as necessary
                type: 'PUT',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(updatedData),
                success: (res) => {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Update Successful!",
                        text: "The crop information has been updated.",
                        showConfirmButton: true,
                        timer: 3000
                    });
                    console.log('Update success:', res);

                    // Optionally reload crop data to reflect updated changes
                    loadCrop();
                },
                error: (err) => {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "Update Failed!",
                        text: "Could not update crop information. Please try again later.",
                        showConfirmButton: true,
                        timer: 4000
                    });
                    console.error('Update failed:', err);
                }
            });
        });
    });


});


//save crop
$("#Save-crop").on('click', () => {

        console.log("next crop code is:"+next_crop_id)
        const cropName = $('#crop_name').val();
        const cropScientificName = $('#crop_scientific_name').val();
        const cropImage = $('#formFileMultiple')[0].files[0];
        const cropCategory = document.getElementById("crop_category");
        const crop_season = document.getElementById("crop_season");
        const FieldID = document.getElementsByClassName("field-code");
        const logIds = document.getElementById("logIds");


        const cropCategory1 = cropCategory.options[cropCategory.selectedIndex].text;
        const cropSeason1 = crop_season.options[crop_season.selectedIndex].text;
        const fieldID1 = FieldID.options[FieldID.selectedIndex].text;
        const logIds1 = logIds.options[logIds.selectedIndex].text;

        let jwtToken = localStorage.getItem('jwtToken');
        console.log("jwt token"+jwtToken)

        const formData = new FormData();
        formData.append("cropCode", next_crop_id);
        formData.append("cropCommonName", cropName);
        formData.append("cropScientificName", cropScientificName);
        formData.append("cropImage", cropImage);
        formData.append("cropSeason", cropSeason1);
        formData.append("cropCategory", cropCategory1);
        formData.append("fieldCode", fieldID1);
        formData.append("logCode", logIds1);
        console.log("From data multipart :"+formData)
        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/crop",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            success: (res) => {
                clear();
                loadNextIid();
                loadCropList();
                Swal.fire({
                    title: "Crop saved successfully!",
                    text: "Success",
                    icon: "success"
                });
            },
            error: (res) => {
                console.error(res);
                alert("Failed to save crop data.");
            }
        });
    });

//load crop list
function loadCropList() {
    let cropArray = [];
    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/crop",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
        dataType: "json",
        success: (res) => {
            cropArray = res;
            console.log("print response:"+res)

            let productContainer = document.querySelector('.product-container');
            productContainer.innerHTML = '';

            cropArray.forEach(crop => {
                let productCard = `
                    <div class="product-card">
                        <div class="product-image">
                            <button class="discount-tag" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <img src="data:image/jpeg;base64,${crop.cropImage}" class="product-thumb" alt="${crop.cropCommonName}">
                            <button type="button" class="card-btn btn-block bg-gradient-primary mb-3" data-bs-toggle="modal" data-bs-target="#modal-default">
                                Information
                            </button>
                        </div>
                        <div class="product-info">
                            <h2 id="pB" class="product-brand">${crop.cropCommonName}</h2>
                            <p class="product-short-description">This crop is ${crop.cropScientificName}, see more..</p>
                         
                        </div>
                    </div>
                `;


                productContainer.innerHTML += productCard;
            });
        },
        error: (err) => {
            Swal.fire({
                position: "top",
                icon: "question",
                title: "Failed to load crops!..",
                showConfirmButton: false,
                timer: 3500
            });
            console.error("Failed to load crops:", err);
        }
    });
}

//calling next crop id
function loadNextIid() {

    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/crop/genCropID",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },

        success: (res) => {

            console.log("print response nextID:"+res)
            next_crop_id = res


            document.getElementById("crop_next_id").innerText = res;


        },
        error: (err) => {
            Swal.fire({
                position: "top",
                icon: "question",
                title: "Failed to load next crop ID!..",
                showConfirmButton: false,
                timer: 3500
            });
            console.error("Failed to load next crop ID:", err);
        }
    });
}

//load crop data
function loadCrop() {
    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/crop",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
        dataType: "json",
        success: (res) => {
            console.log("Response received:", res);


            let tableBody = document.querySelector('.modal-body table tbody');
            tableBody.innerHTML = '';

            res.forEach((crop, index) => {

                let tableRow = `
                    
                
                
                  <td class="editable" data-key="crop-code" contenteditable="false">${crop.cropCode}</td>
                  <td class="editable" data-key="commonName" contenteditable="false">${crop.cropCommonName}</td>
                  <td class="editable" data-key="scientificName" contenteditable="false">${crop.cropScientificName}</td>
                  <td class="editable" data-key="category" contenteditable="false">${crop.cropCategory}</td>
                  <td class="editable" data-key="season" contenteditable="false">${crop.cropSeason}</td>
                  <td class="editable field-id-text" contenteditable="false">${crop.fieldCode}</td>
                  <td class="editable log code" contenteditable="false">${crop.logCode}</td>

                        <td class="edit code">
                            <button id="update-crop"  type="button" class="btn btn-primary btn-sm edit-row">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button type="button" class="btn btn-success btn-sm update-row" style="display: none;">
                                Update
                            </button>
                            <button type="button" class="btn btn-danger btn-sm delete-row">Delete</button>
                        </td>
                
                `;

                tableBody.innerHTML += tableRow;
            });
        },
        error: (err) => {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Failed to load crops!",
                text: "Please try again later.",
                showConfirmButton: true,
                timer: 4000
            });
            console.error("Failed to load crops:", err);
        }
    });
}

//set field code
 function setFieldIds(data) {
    fieldIds.empty();
    fieldIds.append('<option selected>select the Field</option>');

    for (let i = 0; i < data.length; i++) {
        fieldIds.append('<option value="' + (i + 1) + '">' + data[i].fieldCode + '</option>');
    }
}

//set log code
function setLogIds(data) {
    logIds.empty();
    logIds.append('<option selected>select the Log</option>');

    for (let i = 0; i < data.length; i++) {
        logIds.append('<option value="' + (i + 1) + '">' + data[i].logCode + '</option>');
    }
}

//clear function
function  clear(){
    $('#crop_name').val('');
    $('#crop_scientific_name').val('');
    $('#formFileMultiple').val('');


    $('#crop_category').prop('selectedIndex', 0);
    $('#crop_season').prop('selectedIndex', 0);
    $('#FieldID').prop('selectedIndex', 0);
    $('#logIds').prop('selectedIndex', 0);
}


//search crop
$("#search-crop").on("input", function () {
    var typedText = $("#search-crop").val();
    console.log("Search Crop");

    if (typedText.trim() === "") {
        loadCrop();
    } else {
        let jwtToken = localStorage.getItem('jwtToken');
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/crop/${typedText}`,
            type: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            success: (res) => {
                console.log("Response received:", res);

                let tableBody = document.querySelector('.table tbody');
                tableBody.innerHTML = '';

                let record = `
                    <tr>
                        <td class="editable" data-field="cropId">${res.cropCode}</td>
                        <td class="editable" data-field="commonName">${res.cropCommonName}</td>
                        <td class="editable" data-field="scientificName">${res.cropScientificName}</td>
                        <td class="editable" data-field="category">${res.cropCategory}</td>
                        <td class="editable" data-field="season">${res.cropSeason}</td>
                        <td class="field-id-text">${res.fieldCode}</td>
                        <td class="field-id-text">${res.logCode}</td>
                        <td class="field-id-dropdown" style="display:none;">
                            <select>

                                <option value="Field1">Field1</option>
                                <option value="Field2">Field2</option>

                            </select>
                        </td>
                        <td class="edit code">
                            <button id="edit" type="button" class="btn btn-primary btn-sm edit-row">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button type="button" class="btn btn-success btn-sm update-row" style="display: none;">
                                Update
                            </button>
                            <button type="button" class="btn btn-danger btn-sm delete-row">Delete</button>
                        </td>
                    </tr>`;
                tableBody.insertAdjacentHTML('beforeend', record);
            },
            error: (err) => {
                console.error("AJAX error:", err);
                alert("Failed to fetch crop details. Please try again.");
            }
        });
    }
});



