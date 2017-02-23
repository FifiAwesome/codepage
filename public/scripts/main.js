// loads unit-list div
function loadUnits(){
  $('#unit-list').load('/units', function(){
    // link-list needs to load after units have been loaded!
    $("div.unit-icon").on("click", function(){
      $("#link-list").fadeToggle(function(){
        // load specific link list
      });
    })
  });
};

$("document").ready(function() {
   loadUnits();
});


// shows form on top right
$(".plus.icon:first").on("click", function(){
  $(".ui.form:first").fadeToggle();
})
$(".minus.icon:first").on("click", function(){
  $(".formdel, .linkdel").fadeToggle();
})


//  adds new unit via form on top right using AJAX
var frm = $('#unitForm');
frm.submit(function (ev) {
    $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        success: function (data) {
            console.log('ok');
            $(".ui.form:first").fadeToggle(function(){
              $("form.small input").val("");
            });
            loadUnits()
        }
    });
    ev.preventDefault();
});


// $("ul").on("click", "span", function(e){
//   $(this).parent().fadeOut(500, function(){
//     $(this).remove();
//   });
//   e.stopPropagation();
// });
