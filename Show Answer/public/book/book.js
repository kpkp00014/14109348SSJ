$(document).ready(function () {
  function quizList() {
    $('.quizTable').empty();
    var location = window.location.pathname;
    var result = location.replace('book', 'quiz');
    $('.quizTable').append('<ul>');
    $.getJSON(result, function (data) {
      $(data).each(function (index, item) {
        var output = '';
        output += '<li>';
        output += '<a href = "' + location + '/' + item.qno +'">'
        output += item.qname;
        output += '</a>'
        output += '</li>';
        $('.quizTable').append(output);
      });
    });
    $('.quizTable').append('</ul>');
  }


  quizList();

  // li 에 반전 속성 추가

  $(document).on("mouseover", "li", function(){
    $(this).addClass('reverse');
  });
  $(document).on("mouseout", "li", function(){
    $(this).removeClass('reverse');
  });

  var msg = '<form name="QuizAdder" method = "post" target = "_blank">';
  msg += '<input type="text" name="qname"/><input type="submit" value="submit" onclick = "window.location.reload()"/>';
  msg += '</p></form>';

  $('.addQuiz').click(function(){
    $('form').remove();
    $(this).after(msg);
  });

});
