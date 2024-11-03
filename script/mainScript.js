$("#home-section").css({display: 'block'});
$("#field-section").css({display: 'none'});
$("#crop-section").css({display: 'none'});
$("#staff-section").css({display: 'none'});
$("#monitoring-section").css({display: 'none'});
$("#vehicle-section").css({display: 'none'});
$("#equipment-section").css({display: 'none'});

$("#home-btn").on('click', () => {
    $("#home-section").css({display: 'block'});
    $("#field-section").css({display: 'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});

$("#Field-btn").on('click', () => {
    $("#field-section").css({display: 'block'});
    $("#home-section").css({display: 'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});

$("#Crop-btn").on('click', () => {
    $("#crop-section").css({display: 'block'});
    $("#home-section").css({display: 'none'});
    $("#field-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});
$("#Staff-btn").on('click', () => {
    $("#staff-section").css({display: 'block'});
    $("#crop-section").css({display: 'none'});
    $("#home-section").css({display: 'none'});
    $("#field-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});
$("#Monitoring-btn").on('click', () => {
    $("#monitoring-section").css({display: 'block'});
    $("#home-section").css({display: 'none'});
    $("#field-section").css({display: 'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});
$("#Vehicle-btn").on('click', () => {
    $("#vehicle-section").css({display: 'block'});
    $("#home-section").css({display: 'none'});
    $("#field-section").css({display: 'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});
$("#Equipment-btn").on('click', () => {
    $("#equipment-section").css({display: 'block'});
    $("#home-section").css({display: 'none'});
    $("#field-section").css({display: 'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
});


(function ($) {

    "use strict";

    $('nav .dropdown').hover(function () {
        var $this = $(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
    }, function () {
        var $this = $(this);
        $this.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
    });

})(jQuery);

(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()


// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
    if (video.paused) {
        video.play();
        btn.innerHTML = "  <i class=\"fa-solid fa-pause\"></i>";
    } else {
        video.pause();
        btn.innerHTML = "<i class=\"fa-solid fa-play\">";
    }
}
