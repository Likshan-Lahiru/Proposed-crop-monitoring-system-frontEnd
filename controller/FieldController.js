

initialize();


function initialize() {


    setTimeout(() => {
        loadFieldList();
    }, 1000);
}

function loadFieldList() {
    let fieldArray = [];
    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/field",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
        dataType: "json",
        success: (res) => {
            fieldArray = res;
            console.log("print response:"+res)

            setFieldIds(fieldArray);



        },
        error: (err) => {
            Swal.fire({
                position: "top",
                icon: "question",
                title: "Failed to load Field!..",
                showConfirmButton: false,
                timer: 3500
            });
            console.error("Failed to load Field:", err);
        }
    });
}
