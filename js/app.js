$(document).ready(function(){
    var rootDiv = $('#root');
    refreshBooks(rootDiv);
    handleForm();



    rootDiv.on('click', '.book', function(){
       
        var bookDiv = $(this);
        var detailDiv = bookDiv.find('div');
        var bookId = $(this).data("id");

        $.ajax({
            url:"http://localhost:8282/books/" + bookId,
            type: "GET"
        }).done(function(bookDetails){
            detailDiv.toggle();
            detailDiv.text("Autor: " + bookDetails.author + ", id "
            + bookDetails.id + ", isbn " + bookDetails.isbn + ", publisher "
        + bookDetails.publisher + ", type " + bookDetails.type);
        });
    });

    rootDiv.on('click', '.delete_button', function(event){

        event.stopPropagation();
        var bookId = $(this).parent().data("id");

        $.ajax({
            url:"http://localhost:8282/books/" + bookId,
            type: "DELETE"
        }).done(function(){
            refreshBooks(rootDiv);
        })
    });
});

function handleForm(){
    var form = $('.new_book');
    var submitButton = form.find('#add-button');

    submitButton.on('click', function(event){
        event.preventDefault();

        var newBook = {};

        newBook.author = $('#author').val();
        newBook.id = $('#id').val();
        newBook.isbn = $('#isbn').val();
        newBook.publisher = $('#publisher').val();
        newBook.title = $('#title').val();
        newBook.type = $('#type').val();

        $.ajax({
            url:"http://localhost:8282/books",
            type: "POST",
            headers:{
                'Accept': 'application/json',
                "Content-Type":"application/json"
            },       
            data: JSON.stringify(newBook)
        }).done(function(){
            refreshBooks($('#root'));
        })

    })
}

function refreshBooks(rootElement){

    rootElement.html(""); // wyczysci 

    $.ajax({
        url:"http://localhost:8282/books",
        type: "GET"
    }).done(function(data){

        for (var i = 0; i < data.length; i++) {
            var bookElement = $("<div class = 'book' data-id='" + data[i].id + "'>" + data[i].title + "<button class='delete_button'>Usuń</button>" +"<div style='display:none; background-color:grey;'></div></div>");
            rootElement.append(bookElement)
        }
    });


}
// author
// id
// isbn
// publisher
// title
// type