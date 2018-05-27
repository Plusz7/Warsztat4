$(document).ready(function(){
    var rootDiv = $('#root');

    $.ajax({
        url:"http://localhost:8282/books",
        type: "GET"
    }).done(function(data){

        for (var i = 0; i < data.length; i++) {
            var bookElement = $("<div>" + data[i].title + "<div></div></div>");
            rootDiv.append(bookElement)
        }
    })
});
// author
// id
// isbn
// publisher
// title
// type