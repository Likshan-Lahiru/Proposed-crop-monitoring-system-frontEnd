const fieldIds = $('.field-id');
const logIds = $('.log-id');
let cropId = "";
let next_crop_id;

initialize();

function initialize() {
    setTimeout(() => {
       loadCropList();
        loadCrop();
        loadNextIid();

    }, 1000);
}

//save crop
$("#Save-crop").on('click', () => {

        console.log("next crop code is:"+next_crop_id)
        const cropName = $('#crop_name').val();
        const cropScientificName = $('#crop_scientific_name').val();
        const cropImage = $('#formFileMultiple')[0].files[0];
        const cropCategory = document.getElementById("crop_category");
        const crop_season = document.getElementById("crop_season");
        const FieldID = document.getElementById("FieldID");
        const logIds2 = document.getElementById("log-id");


        const cropCategory1 = cropCategory.options[cropCategory.selectedIndex].text;
        const cropSeason1 = crop_season.options[crop_season.selectedIndex].text;
        const fieldID1 = FieldID.options[FieldID.selectedIndex].text;
        const logIds1 = logIds2.options[logIds2.selectedIndex].text;

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

//update crop
$("#update-crop").on('click', () => {
   // const cropId = $('#crop_update_id').val();


    const cropName = $('#recipient-name').val();

    const cropScientificName = $('#message-text').val();
    const cropImage = $('#formFileMultiple1')[0].files[0];
    const cropCategory = document.getElementById("crop_update_category");
    const crop_season = document.getElementById("crop_update_season");
    const FieldID = document.getElementById("Field_update_ID");
    const logIds2 = document.getElementById("log_update_id");


    const cropCategory1 = cropCategory.options[cropCategory.selectedIndex].text;
    const cropSeason1 = crop_season.options[crop_season.selectedIndex].text;
    const fieldID1 = FieldID.options[FieldID.selectedIndex].text;
    const logIds1 = logIds2.options[logIds2.selectedIndex].text;

    let jwtToken = localStorage.getItem('jwtToken');
    console.log("jwt token"+jwtToken)

    const formData = new FormData();
    formData.append("cropCode", cropId);
    formData.append("cropCommonName", cropName);
    formData.append("cropScientificName", cropScientificName);
    formData.append("cropImage", cropImage);
    formData.append("cropSeason", cropSeason1);
    formData.append("cropCategory", cropCategory1);
    formData.append("fieldCode", fieldID1);
    formData.append("logCode", logIds1);

    console.log("From data multipart (cropCode): " + formData.get("cropCode"));
    console.log("From data multipart (cropCommonName): " + formData.get("cropCommonName"));
    console.log("From data multipart (cropScientificName): " + formData.get("cropScientificName"));


    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/crop/${cropId}`,
        type: "PUT",
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
        console.log(data[i])
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
    $('#message-text').val('');
    $('#formFileMultiple').val('');
    $('#formFileMultiple1').val('');
    $('#recipient-name').val('');



    $('#crop_category').prop('selectedIndex', 0);
    $('#crop_update_category').prop('selectedIndex', 0);
    $('#crop_season').prop('selectedIndex', 0);
    $('#crop_update_season').prop('selectedIndex', 0);
    $('#FieldID').prop('selectedIndex', 0);
    $('#Field_update_ID').prop('selectedIndex', 0);
    $('#log-id').prop('selectedIndex', 0);
    $('#log_update_id').prop('selectedIndex', 0);
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

//load crop list
function loadCropList() {

        const productContainer = document.querySelector('.product-container');

        const jwtToken = localStorage.getItem('jwtToken');


        function loadCropList() {
            $.ajax({
                url: "http://localhost:8080/greenShadow/api/v1/crop",
                type: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                dataType: "json",
                success: (res) => {
                    productContainer.innerHTML = '';
                    res.forEach(crop => {
                        const productCard = `
                        <div class="product-card">
                            <div class="product-image">
                                <button class="discount-tag open-update-modal" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal" 
                                        data-id="${crop.cropCode}">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                <img src="data:image/jpeg;base64,${crop.cropImage}" 
                                     class="product-thumb" 
                                     alt="${crop.cropCommonName}">
                                <button  type="button" class="card-btn btn-block bg-gradient-primary mb-3 open-update-modal" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#modal-default"
                                        data-id="${crop.cropCode}">
                                        
                                        
                                    Information
                                </button>
                            </div>
                            <div class="product-info">
                                     <div class="col">
                                           <h2 id="pB" class="product-brand">${crop.cropCommonName}</h2>
                                      </div>
                                <p class="product-short-description">Crop Scientific Name :${crop.cropScientificName}</p>
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


        function loadCropDetailsIntoModal(cropId) {
            $.ajax({
                url: `http://localhost:8080/greenShadow/api/v1/crop/${cropId}`,
                type: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                dataType: "json",
                success: (crop) => {

                    document.getElementById('crop_update_id').innerText = crop.cropCode;


                    loadUpdateId(crop.cropCode);
                    document.getElementById('crop_id').innerText = crop.cropCode;
                    document.getElementById('recipient-name').value = crop.cropCommonName;
                    document.getElementById('crop-name').innerText = crop.cropCommonName;
                    document.getElementById('message-text').value = crop.cropScientificName;
                    document.getElementById('crop-scientific-name').innerText = crop.cropScientificName;
                    document.getElementById("old_log_id").innerText  = crop.logCode;
                    document.getElementById('field_id').innerText = crop.fieldCode;
                    document.getElementById('old_category').innerText = crop.cropCategory;
                    document.getElementById('crop-category').innerText = crop.cropCategory;
                    document.getElementById('old_season').innerText = crop.cropSeason;
                    document.getElementById('crop-season').innerText = crop.cropSeason;
                    document.getElementById("crop-image").src = "data:image/jpeg;base64," + crop.cropImage;


                },
                error: (err) => {
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "Failed to load crop details!..",
                        showConfirmButton: false,
                        timer: 3500
                    });
                    console.error("Failed to load crop details:", err);
                }
            });
        }


        productContainer.addEventListener('click', function (event) {
            const updateButton = event.target.closest('.open-update-modal');
            if (updateButton) {
                const cropId = updateButton.getAttribute('data-id');
                loadCropDetailsIntoModal(cropId);
            }
        });



        loadCropList();

}

function loadUpdateId(id) {
    cropId = id
    console.log("print load update id"+cropId)
}

//delete crop
$("#delete-crop").on("click", function () {

    console.log("Search Crop");
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            let jwtToken = localStorage.getItem('jwtToken');
            $.ajax({
                url: `http://localhost:8080/greenShadow/api/v1/crop/${cropId}`,
                type: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                success: (res) => {
                    console.log("Response received:", res);
                    initialize()
                    Swal.fire({
                        title: "Crop Delete successfully!",
                        text: "Success",
                        icon: "success"
                    });


                },
                error: (err) => {
                    console.error("AJAX error:", err);
                    Swal.fire({
                        title: "crop Delete unsuccessfully!",
                        text: "Error",
                        icon: "Error"
                    });
                }
            });
        }
    });




});




