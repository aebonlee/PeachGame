$(function(){
  var $peach = $('.game>.container>.frame');
  var intervalID = null;
  var intervalTime = 900;
  var score = 0;
  var $comment = $('.game>.container>h2');
  var $btn = $('.game>.container>button');
  var nowIdx = 0;

  //복숭아 랜덤 발생 함수
  function idx(){
    nowIdx = 1+Math.floor(Math.random()*4);
  }

  function randomPeach(){
    idx();
    $peach.children('img').attr('src','images/peach_normal_'+nowIdx+'.png');
  }

  //복숭아 출몰 함수
  function start(){
    clearInterval(intervalID);

    intervalID = setInterval(function(){
      $comment.text('메롱~ 나는야 이 구역 악동 복!숭!아!')
      randomPeach();

      var coordX = 42+Math.floor(Math.random()*3)*200;
      var coordY = 197+Math.floor(Math.random()*3)*157; 
   
      $peach.css({
        display:'block',
        left:coordX,
        top:coordY
      }).stop().animate({//올라가는 동작
        top:coordY-35
      },650).animate({//내려가는 동작
        top:coordY
      },250);

    },intervalTime);
  }

  //스타트 이벤트
  $btn.on('click',function(){
    $peach.hide();

    score = 0;
    $('.score').text('0000점');
    start(); //복숭아 출몰 함수
    
    setTimeout(function(){
      clearInterval(intervalID); //복숭아 출몰 종료

      $peach.hide();
      $comment.text('START버튼을 누르면 게임이 시작됩니다.');
    },15000); //15초간 게임 진행
  });

  //복숭아 클릭 이벤트
  $peach.on('click',function(){
    $comment.text('아야!! 왜 때려! 복숭아 살려 ㅠㅠㅠㅠㅠㅠ');
    $(this).children('img').attr('src','images/peach_shock_'+nowIdx+'.png');

    if(nowIdx==1){
      score += 100;
    }else if(nowIdx==2){
      score += 200;
    }else if(nowIdx==3){
      score += 500;
    }else{
      score -= 100;
    }
    
    $('.score').text(score+'점');
  });

  $peach.on('mouseover',function(){
    $(this).css('cursor','crosshair');
  });

  //미디어 쿼리 로직
  var timer = null;

  function resizing(){
    var winWidth = $('html,body').width();

    if(winWidth<768){
      alert('해당 이벤트 페이지는 PC(1920px)와 태블릿(768px)에 최적화되었습니다.');
    }
  }

  $(window).one('resize', function(){
    clearTimeout(timer);
    timer = setTimeout(resizing,400);
  });
});