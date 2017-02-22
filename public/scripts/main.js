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

// $("div.unit-icon a").get(this[href], function(){
//
// })

//  adds new unit via form on top right using AJAX
var frm = $('#unitForm');
frm.submit(function (ev) {
    $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        success: function (data) {
            // loadUnits();
            console.log('ok');
            $(".ui.form:first").fadeToggle(function(){
              $("form.small input").val("");
            });
            loadUnits()
        }
    });
    ev.preventDefault();
});
