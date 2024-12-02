$('#customerButtonDelete').on('click', () => {
    var id = $('#customerId').val();
    var jwtToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token from localStorage or another storage location

    $.ajax({
        url: "http://localhost:8080/api/v1/customer/" + id,
        type: "DELETE",
        headers: {
            "Authorization": "Bearer " + jwtToken // Pass the token in the Authorization header
        },
        success: (res) => {
            initialize();
            $('#customerButtonReset').click();
            Swal.fire({
                title: "Customer Deleted successfully!",
                text: JSON.stringify(res), // Optional: Display the response in the alert
                icon: "success"
            });
        },
        error: (res) => {
            console.error(res);
            Swal.fire({
                title: "Error!",
                text: "Failed to delete customer data.",
                icon: "error"
            });
        }
    });
});
