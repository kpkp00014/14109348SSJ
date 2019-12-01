var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');
var app = express();
var path = require('path');
// DB 연결
var client = mysql.createConnection(
  {
    user : 'nodeuser',
    password: 'nodetest',
    database: 'ShowAnswer'
  }
);

//웹서버 생성
app.use(express.static('public'));
app.use(bodyParser.urlencoded({detended:false}));

app.get('/booklist', function(request, response){
  client.query('SELECT * FROM book', function (error, data) {
        response.send(data);
        console.log('bookList requested');
  });
});

app.get('/quiz', function(request, response){
  var id = Number(request.params.id);
  client.query('SELECT * FROM quiz', function (error, data){
    response.send(data);
    console.log('quiz 요청');
  });
});

app.get('/quiz/:bid', function(request, response){
  var bid = Number(request.params.bid);
  client.query('SELECT * FROM quiz WHERE bid=?',[
    bid
  ], function (error, data){
    response.send(data);
    console.log('quiz bid 요청');
  });
});

app.get('/book/:input', function(req,res){
  res.sendFile('book.html', {root : path.join(__dirname, '/public')});
});

app.post('/book/:bid/', function(req, res){
  var qname = req.body.qname;
  var bid = req.params.bid;
  var msg = "<h1>quiz 입력이 ";
  if (qname != ''){
    var result = "call addQuiz("+ bid + ",'" + qname + "')";
    client.query(result, function(error, data){});
    msg += "성공하였습니다.</h1>";
  }
  else {
    console.log('빈 값이 insert 시도 되었습니다.');
    msg += "실패하였습니다.</h1>";
  }
  res.send(msg);
});

app.get('/book/:bid/:qno', function(req, res){
  res.sendFile('quiz.html', {root : path.join(__dirname, '/public')});

});

app.get('/quiz/:bid/:qno', function(req,res){
  var bid = Number(req.params.bid);
  var qno = Number(req.params.qno);
  client.query('SELECT answer, count(answer) c from answer where bid = ? and qno = ? group by answer order by c desc',[
    bid, qno
  ], function (error, data){
    res.send(data);
  });
})

app.post('/quiz/:bid/:qno', function(req,res){
    var bid = Number(req.params.bid);
    var qno = Number(req.params.qno);
    var answer = req.body.answer;
    if (answer != ''){
      var result = "call addAnswer("+ bid + "," + qno + ","+ answer + ")";
      client.query(result, function(error, data){});
    }
})

app.get('/title/:bid/:qno', function(req, res){
  var bid = Number(req.params.bid);
  var qno = Number(req.params.qno);
  client.query('SELECT qname from quiz where bid = ? and qno = ?',[
    bid, qno
  ], function (error, data){
    res.send(data);
  });
});

app.listen(52273, function() {
  console.log('Server Running at http://127.0.0.1:52273');
});
