
initialize();

function initialize() {
    setTimeout(() => {
    loadStaffData();
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
        const staffSection = document.getElementById("staff-section");
        const container = staffSection.querySelector(".container .row");
        container.innerHTML = ""; // Clear any existing content

        staffList.forEach(staff => {
            const staffCard = `
<div class="col-md-4">
    <div class="card employee-card" style="width: 18rem; border: none; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 10px; overflow: hidden; transition: transform 0.3s;">
        <img src="data:image/jpeg;base64,${staff.image}" class="card-img-top" alt="Staff Image" >
        <div class="card-body" style="background: #f9f9f9; padding: 1.5rem;">
            <h5 class="card-title" style="font-weight: bold; color: #333;">${staff.firstName} ${staff.lastName}</h5>
            <p style="color: #777; margin: 0 0 0.5rem;">Employee ID: <span style="color: #007bff;">${staff.staffId}</span></p>
            <ul style="list-style: none; padding: 0; margin: 0; color: #555; font-size: 14px;">
                <li><strong>Contact:</strong> ${staff.contact}</li>
   
                <li><strong>Email:</strong> <a href="mailto:${staff.email}" style="text-decoration: none; color: #007bff;">${staff.email}</a></li>
                <li><strong>Job Role:</strong> ${staff.jobRole}</li>
          
            </ul>
                   <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target=""><i class="fa-solid fa-pen-to-square"></i></button>

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




/*    function loadCropDetailsIntoModal(cropId) {
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
    }*/


/*    productContainer.addEventListener('click', function (event) {
        const updateButton = event.target.closest('.open-update-modal');
        if (updateButton) {
            const cropId = updateButton.getAttribute('data-id');
            loadCropDetailsIntoModal(cropId);
        }
    });*/