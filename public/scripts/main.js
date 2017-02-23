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


// $("input[name='link[name]'], input[name='link[url]']").keypress(function(e){
//   if(e.which === 13){
//     submitForm()
//   };
// });




// $("#input.title, #input.url").keypress(function(e){
//   if(e.which === 13){
//     var newLink = $("#input.title").val();
//     $("#link-list").append("<a href='" + newLink + "' class='item'><i class='angle right icon'></i>" + newLink + "</a>");
//     $(this).val("");
//   }
// });


//   var attr = $("a").attr("href")
//   var link = $(this).attr("href")
// $("#link-list").load(attr)
//   ev.preventDefault();
//   var attr = $(this).attr("href")
//   $("#link-list").load(attr);
// })


//
// $("ul").on("click", "span", function(e){
//   $(this).parent().fadeOut(500, function(){
//     $(this).remove();
//   });
//   e.stopPropagation();
// });
