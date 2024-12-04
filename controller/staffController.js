let deleteId;
initialize();

function initialize() {
    setTimeout(() => {
    loadStaffData();
    loadStaffTable();
        loadNextIid();

    }, 1000);
}

function loadStaffData(){
    const jwtToken = localStorage.getItem('jwtToken');

    function loadStaffList() {
        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/staff",
            type: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            dataType: "json",
            success: (response) => {
                populateStaffCards(response);
            },
            error: (error) => {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: "Failed to load staff data!",
                    showConfirmButton: false,
                    timer: 3500
                });
                console.error("Error loading staff data:", error);
            }
        });
    }

    function populateStaffCards(staffList) {
        const staffSection = document.getElementById("staff-section1");
        const container = staffSection.querySelector(".container .row");
        container.innerHTML = "";

        staffList.forEach(staff => {
            const staffCard = `
                    <div class="col-md-4">
                         <div class="card employee-card" style="width: 18rem; border: none; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 10px; overflow: hidden; transition: transform 0.3s;">
                                 <img src="data:image/jpeg;base64,${staff.image}" class="card-img-top" alt="Staff Image" width="350" height="300">
                             <div class="card-body" style="background: #f9f9f9; padding: 1.5rem;">
                           <h5 class="card-title" style="font-weight: bold; color: #333;">${staff.firstName} ${staff.lastName}</h5>
                         <p style="color: #777; margin: 0 0 0.5rem;">Employee ID: <span style="color: #007bff;">${staff.staffId}</span></p>
                             <ul style="list-style: none; padding: 0; margin: 0; color: #555; font-size: 14px;">
                                   <li><strong>Contact:</strong> ${staff.contact}</li>
                        <li><strong>Email:</strong> <a href="mailto:${staff.email}" style="text-decoration: none; color: #007bff;">${staff.email}</a></li>
                                    <li><strong>Job Role:</strong> ${staff.jobRole}</li>
                                </ul>
                  <button id="staff-update" class="btn btn-primary" data-id="${staff.staffId}" data-bs-toggle="modal" data-bs-target="#staffUpdateModel"><i class="fa-solid fa-pen-to-square"></i></button>
                               </div>
                                      </div>
                                     </div>
                                          </div>
        `;
            container.innerHTML += staffCard;
        });
    }

    loadStaffList();
}


//staff next id
function loadNextIid() {

    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/staff/genStaffID",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },

        success: (res) => {

            console.log("print response nextID:"+res)
            next_crop_id = res


            document.getElementById("staff_next_id").innerText = res;


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

document.getElementById('staff-section').addEventListener('click', function (event) {
    const updateButton = event.target.closest('#staff-update');

    if (updateButton) {
        const staffId = updateButton.getAttribute('data-id');
        loadStaffDetailsIntoModal(staffId);
        deleteId = staffId;
    }
});


function loadStaffDetailsIntoModal(staffId) {
    const jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/staff/${staffId}`,
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
        dataType: "json",
        success: (staff) => {
            console.log(staff.fieldIds,"staff ids")
            console.log(staff.jobRole,"staff job role")
            document.getElementById('staff_id').innerText = staff.staffId;
            document.getElementById('staff-first-name').value = staff.firstName;
            document.getElementById('staff-last-name').value = staff.lastName;
            document.getElementById('old-staff-designation').innerText = staff.staffDesignation;
            document.getElementById('old-gender').innerText = staff.gender;
            document.getElementById('joing-date').value = staff.joinedDate;
            document.getElementById('birthday').value = staff.DOB;
            document.getElementById('staff-AddressLine01').value = staff.addressLine01;
            document.getElementById('staff-AddressLine02').value = staff.addressLine02;
            document.getElementById('staff-AddressLine03').value = staff.addressLine03;
            document.getElementById('staff-AddressLine04').value = staff.addressLine04;
            document.getElementById('staff-AddressLine05').value = staff.addressLine05;
            document.getElementById('staff-contact').value = staff.contact;
            document.getElementById('staff-email').value = staff.email;
            document.getElementById('old-jobRole').innerText = staff.jobRole;
            document.getElementById('old-logCode').innerText = staff.logCode;
            document.getElementById('old-field-id').innerText = staff.fieldIds;
        },
        error: (err) => {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Failed to load Staff details!",
                showConfirmButton: false,
                timer: 3500
            });
            console.error("Failed to load Staff details:", err);
        }
    });
}

//staff update
document.getElementById('update-staff').addEventListener('click', () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const staffId = document.getElementById('staff_id').innerText;
    const formData = new FormData();
    const staffGender = document.getElementById("staff gender");
    const staffDesignation = document.getElementById("staff-designation");
    const staffJobRole = document.getElementById("staff-jobRole");
    const staffUpdateLogCode = document.getElementById("staff-update-logCode");
    const staffUpdateFieldId = document.getElementById("staff-update-field-id");

    const staffGender1 = staffGender.options[staffGender.selectedIndex].text;
    const staffDesignation1 = staffDesignation.options[staffDesignation.selectedIndex].text;
    const staffJobRole1 = staffJobRole.options[staffJobRole.selectedIndex].text;
    const staffUpdateLogCode1 = staffUpdateLogCode.options[staffUpdateLogCode.selectedIndex].text;
    const staffUpdateFieldId1 = staffUpdateFieldId.options[staffUpdateFieldId.selectedIndex].text;


    formData.append('firstName', document.getElementById('staff-first-name').value || '');
    formData.append('lastName', document.getElementById('staff-last-name').value || '');
    formData.append('staffDesignation', staffDesignation1 || '');
    formData.append('gender', staffGender1 || ''); // Use the first dropdown value
    formData.append('joinedDate', document.getElementById('joing-date').value || '');
    formData.append('DOB', document.getElementById('birthday').value || '');
    formData.append('AddressLine01', document.getElementById('staff-AddressLine01').value || '');
    formData.append('AddressLine02', document.getElementById('staff-AddressLine02').value || '');
    formData.append('AddressLine03', document.getElementById('staff-AddressLine03').value || '');
    formData.append('AddressLine04', document.getElementById('staff-AddressLine04').value || '');
    formData.append('AddressLine05', document.getElementById('staff-AddressLine05').value || '');
    formData.append('contact', document.getElementById('staff-contact').value || '');
    formData.append('email', document.getElementById('staff-email').value || '');
    formData.append('jobRole', staffJobRole1 || '');
    formData.append('image', document.getElementById('staff-update-image').files[0] || null);
    formData.append('logCode', staffUpdateLogCode1 || '');
    formData.append('fieldIds', staffUpdateFieldId1 || '');



    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/staff/${staffId}`,
        type: "PUT",
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
        success: (res) => {
            loadStaffData();
            loadStaffTable();
            clear();
            Swal.fire({
                title: "Staff updated successfully!",
                text: "Success",
                icon: "success"
            });
        },
        error: (res) => {
            console.error(res);
            Swal.fire({
                title: "Error!",
                text: "Failed to update staff data.",
                icon: "error"
            });
        }
    });
});

//load staff details
function loadStaffTable(){
    const jwtToken = localStorage.getItem('jwtToken');


    $(document).ready(function () {
        $.ajax({
            url: "http://localhost:8080/greenShadow/api/v1/staff",
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            },
            success: function (response) {

                $("#staff-details").empty();


                response.forEach((staff) => {
                    const row = `
            <tr>
              <td>${staff.staffId}</td>
              <td>${staff.firstName}</td>
              <td>${staff.lastName}</td>
              <td>${staff.staffDesignation}</td>
              <td>${staff.gender}</td>
              <td>${staff.joinedDate}</td>
              <td>${staff.contact}</td>
              <td>${staff.email}</td>
              <td>${staff.jobRole}</td>
              <td>${staff.logCode}</td>
            
            </tr>`;
                    $("#staff-details").append(row);
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching staff data:", error);
                alert("Failed to fetch staff details. Please try again.");
            }
        });
    });
}

//save staff
document.getElementById('save-staff').addEventListener('click', function() {

    const jwtToken = localStorage.getItem('jwtToken');


    const staffId = document.getElementById('staffSaveModel').querySelector('.staff_next_id').innerText;


    const formData = new FormData();


    formData.append('firstName', document.getElementById('staff-f-name').value || '');
    formData.append('lastName', document.getElementById('staff-l-name').value || '');


    const staffGender = document.getElementById("staffGender");
    const staffDesignation = document.getElementById("staff-designation1");
    const staffJobRole = document.getElementById("s-staff-jobRole");
    const staffUpdateLogCode = document.getElementById("staff-save-logCode");
    const staffUpdateFieldId = document.getElementById("staff-save-field-id");

    formData.append('staffId', staffId || '');
    formData.append('staffDesignation', staffDesignation.options[staffDesignation.selectedIndex].text || '');
    formData.append('gender', staffGender.options[staffGender.selectedIndex].text || '');
    formData.append('joinedDate', document.getElementById('joing-date1').value || '');
    formData.append('DOB', document.getElementById('birthday1').value || '');
    formData.append('AddressLine01', document.getElementById('s-staff-AddressLine01').value || '');
    formData.append('AddressLine02', document.getElementById('s-staff-AddressLine02').value || '');
    formData.append('AddressLine03', document.getElementById('s-staff-AddressLine03').value || '');
    formData.append('AddressLine04', document.getElementById('s-staff-AddressLine04').value || '');
    formData.append('AddressLine05', document.getElementById('s-staff-AddressLine05').value || '');
    formData.append('contact', document.getElementById('s-staff-contact').value || '');
    formData.append('email', document.getElementById('s-staff-email').value || '');
    formData.append('jobRole', staffJobRole.options[staffJobRole.selectedIndex].text || '');
    formData.append('image', document.getElementById('staff-save-image').files[0] || null);
    formData.append('logCode', staffUpdateLogCode.options[staffUpdateLogCode.selectedIndex].text || '');
    formData.append('fieldIds', staffUpdateFieldId.options[staffUpdateFieldId.selectedIndex].text || '');


    $.ajax({
        url: `http://localhost:8080/greenShadow/api/v1/staff`,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
        success: (res) => {
            clear();
            loadStaffData();
            loadStaffTable();


            Swal.fire({
                title: "Staff saved successfully!",
                text: "Success",
                icon: "success"
            });
        },
        error: (res) => {
            console.error(res);
            Swal.fire({
                title: "Error!",
                text: "Failed to save staff data.",
                icon: "error"
            });
        }
    });
});

//clear function
function  clear(){
    $('.form-control').val('');
    $('.styled-date-picker').val('');
    $('.form-select').prop('selectedIndex', 0);
}

$("#clear-save-model").on('click', () => {
    clear()
});

//delete staff
$("#delete-staff").on("click", function () {

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
                url: `http://localhost:8080/greenShadow/api/v1/staff/${deleteId}`,
                type: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                success: (res) => {
                    console.log("Response received:", res);
                    initialize()
                    Swal.fire({
                        title: "Staff Delete successfully!",
                        text: "Success",
                        icon: "success"
                    });


                },
                error: (err) => {
                    console.error("AJAX error:", err);
                    Swal.fire({
                        title: "Staff Delete unsuccessfully!",
                        text: "Error",
                        icon: "Error"
                    });
                }
            });
        }
    });




});

//search staff
$("#search-staff").on("input", function () {
    var typedText = $("#search-staff").val();
    console.log("Search Staff");

    if (typedText.trim() === "") {
        initialize();
    } else {
        let jwtToken = localStorage.getItem('jwtToken');
        $.ajax({
            url: `http://localhost:8080/greenShadow/api/v1/staff/${typedText}`,
            type: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            success: (staff) => {
                console.log("Response received:", staff);


                const staffDetailsTbody = $("#staff-details");
                staffDetailsTbody.empty();
                staffDetailsTbody.append(`
                    <tr>
                        <td>${staff.staffId}</td>
                        <td>${staff.firstName}</td>
                        <td>${staff.lastName}</td>
                        <td>${staff.staffDesignation}</td>
                        <td>${staff.gender}</td>
                        <td>${staff.joinedDate}</td>
                        <td>${staff.contact}</td>
                        <td>${staff.email}</td>
                        <td>${staff.jobRole}</td>
                        <td>${staff.logCode}</td>
                    </tr>
                `);
            },
            error: (err) => {
                console.error("AJAX error:", err);
                alert("Failed to fetch staff details. Please try again.");
            }
        });
    }
});
