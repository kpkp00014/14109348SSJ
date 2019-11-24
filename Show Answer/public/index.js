$(document).ready(function () {
  function bookList() {
    $('.bookTable').empty();
    $.getJSON('/booklist', function (data) {
      $(data).each(function (index, item) {
        var output = '';
        output += '<table class = "bookMain">';
        output += '<tr><td class="bookTitle">'
        output += '<a href = "/book/'+item.bid+'">';
        output += item.bname;
        output += '</a>';
        output += '</td></tr>'
        output += '<tr><td class="bookPic">';
        output += '<a href = "/book/'+item.bid+'">';
        output += '<img src= "bookImg/' + item.bname +'.jpg" />';
        output += '</a>';
        output += '</td></tr>'
        output += '</table>';
        $('.bookTable').append(output);
      });
    });
  }
  bookList();
});
