$("#home-section").css({display:'block'});
$("#field-section").css({display: 'none'});
$("#crop-section").css({display: 'none'});
$("#staff-section").css({display: 'none'});
$("#monitoring-section").css({display: 'none'});
$("#vehicle-section").css({display: 'none'});
$("#equipment-section").css({display: 'none'});

$("#home-btn").on('click',()=>{
    $("#home-section").css({display:'block'});
    $("#field-section").css({display: 'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});

$("#Field-btn").on('click',()=>{
    $("#field-section").css({display: 'block'});
    $("#home-section").css({display:'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});

$("#Crop-btn").on('click',()=>{
    $("#crop-section").css({display: 'block'});
    $("#home-section").css({display:'none'});
    $("#field-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});
$("#Staff-btn").on('click',()=>{
    $("#staff-section").css({display: 'block'});
    $("#crop-section").css({display: 'none'});
    $("#home-section").css({display:'none'});
    $("#field-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});
$("#Monitoring-btn").on('click',()=>{
    $("#monitoring-section").css({display: 'block'});
    $("#home-section").css({display:'none'});
    $("#field-section").css({display: 'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});
$("#Vehicle-btn").on('click',()=>{
    $("#vehicle-section").css({display: 'block'});
    $("#home-section").css({display:'none'});
    $("#field-section").css({display: 'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#equipment-section").css({display: 'none'});
});
$("#Equipment-btn").on('click',()=>{
    $("#equipment-section").css({display: 'block'});
    $("#home-section").css({display:'none'});
    $("#field-section").css({display: 'none'});
    $("#crop-section").css({display: 'none'});
    $("#staff-section").css({display: 'none'});
    $("#monitoring-section").css({display: 'none'});
    $("#vehicle-section").css({display: 'none'});
});