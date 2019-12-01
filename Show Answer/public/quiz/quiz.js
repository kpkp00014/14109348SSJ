$(document).ready(function () {
  function quizList() {
    $('.quizResult').empty();
    var location = window.location.pathname;
    var result = location.replace('book', 'quiz');
    $('.quizResult').append('<tr><th>Rank</th><th>Answer</th><th>Number</th></tr>');
    $.getJSON(result, function (data) {
      $(data).each(function (index, item) {
        var output = '';
        output += '<tr>';
        output += '<td>'+ (index+1)+'</td>';
        output += '<td>'+ item.answer +'</td>';
        output += '<td>'+ item.c +'</td>';
        output += '</tr>';
        $('.quizResult').append(output);
      });
    });
    $('.quizResult').append('</table>');

    var title = result.replace('quiz', 'title');
    $.getJSON(title, function(data){
      $(data).each(function (index, item) {
        var output = '';
        output += '<H1>' + item.qname + '</H1>'
        $('.inputAnswer').prepend(output);
      });
    });

  }

  $('#my-form').submit(function (event){

    $('.quizResult').append(result);
    var location = window.location.pathname;
    var result = location.replace('book', 'quiz');
    $.ajax({
      url : result,
      type: 'post',
      data :{
        answer : $('#answer').val()
      }
    });
    $('.inputAnswer').empty();
    quizList();
    event.preventDefault();
  });

  quizList();


});
