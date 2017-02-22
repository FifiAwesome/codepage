// loads unit-list div
$(document).ready(function(){
    $('#unit-list').load('/units');
});

// shows form on top right
$(".plus.icon:first").on("click", function(){
  $(".ui.form:first").fadeToggle();
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
            $('#unit-list').load('/units');
        }
    });
    ev.preventDefault();
});
