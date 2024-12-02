

initialize();


function initialize() {


    setTimeout(() => {
        loadLogList();
    }, 1000);
}

function loadLogList() {
    let logArray = [];
    let jwtToken = localStorage.getItem('jwtToken');
    $.ajax({
        url: "http://localhost:8080/greenShadow/api/v1/field",
        type: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        },
        dataType: "json",
        success: (res) => {
            logArray = res;
            console.log("print response:"+res)

            setLogIds(logArray);



        },
        error: (err) => {
            Swal.fire({
                position: "top",
                icon: "question",
                title: "Failed to load Log!..",
                showConfirmButton: false,
                timer: 3500
            });
            console.error("Failed to load Log:", err);
        }
    });
}
