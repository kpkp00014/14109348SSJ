


$(document).ready(function () {
  function addData(chart, label, data){
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }
  var ctx = document.getElementById('myChart');

  function quizList() {
    var pieChart = new Chart(ctx, {
      type : 'pie',
      data: {
        labels : [],
        datasets: [{
          data : [],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
    $('.quizResult').empty();
    var location = window.location.pathname;
    var result = location.replace('book', 'quiz');
    $('.quizResult').append('<tr><th>Rank</th><th>Answer</th><th>Number</th></tr>');



    $.getJSON(result, function (data) {
      $(data).each(function (index, item) {
        var output = '';
        output += '<tr>';
        output += '<td>'+ (index+1)+'</td>';
        output += '<td>'+ item.x +'</td>';
        output += '<td>'+ item.value +'</td>';
        output += '</tr>';
        $('.quizResult').append(output);
        addData(pieChart, item.x, item.value);
      });
    });
    $('.quizResult').append('</table>');

    var title = result.replace('quiz', 'title');
    $.getJSON(title, function(data){
      $(data).each(function (index, item) {
        var output = '';
        output += '<H1>' + item.bname + '&nbsp;' +item.qname + '</H1>';
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
