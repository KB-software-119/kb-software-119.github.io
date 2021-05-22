const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 16; // 질문 개수
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 사용자가 선지를 누를 때마다 어떤 선지를 누른지 저장

var resource_result;
var resource_need_tree;

var elec_result;
var need_tree;

var totalAir_co2;
var totalAir_tree;
// function calResult(){ // 질문에 대한 대답 중 가장 많이 나온 type을 결과값으로 보여준다
//   console.log(select);
//   var result = select.indexOf(Math.max(...select));
//   return result;
// }

// function setResult(){
//   let point = calResult();
//   const resultName = document.querySelector('.resultname');
//   resultName.innerHTML = infoList[point].name;

//   var resultImg = document.createElement('img');
//   const imgDiv = document.querySelector('#resultImg');
//   var imgURL = 'img/image-' + point + '.png';
//   resultImg.src = imgURL;
//   resultImg.alt = point;
//   resultImg.classList.add('img-fluid');
//   imgDiv.appendChild(resultImg);

//   const resultDesc = document.querySelector('.resultDesc');
//   resultDesc.innerHTML = infoList[point].desc;
// }

function calTraffic() {
  // 1번 문항 : 도보/자전거 이용 횟수 (연간기준)
  var co2 = 25.1;
  var tree = 3.8;
  var num = select[0]; // 몇 번 선지
  var freq = qnaList[0].a[select[0]].data[0]; // 빈도
  
  var total_co21 = Math.round(freq * co2 * 10) / 10;
  var total_tree1 = Math.round(freq * tree * 10) / 10;

  // 2-1, 2-2번 문항 : 자동차 연료 종류와 연료비 (월간)
  var op = select[1]; // 자동차 이용 여부
  var fuel = select[2]; // 연료 선지
  var cost = qnaList[3].a[select[3]].data[0]; // 연료비
 
  var total_co22;
  var total_tree2;

  if (op == 0) {
    if (fuel == 0) {
      // 휘발유
      // 10000원 기준 co2 발생량과 필요 소나무
      var base_co2 = 11.8;
      var base_tree = 1.8;
      total_co22 = Math.round(base_co2 + 11.7 * (cost - 1) * 10) / 10;
      total_tree2 = Math.round(base_tree + 1.8 * (cost - 1) * 10) / 10;
    } else if (fuel == 1) {
      // 경유
      var base_co2 = 16.2;
      var base_tree = 2.5;
      total_co22 = Math.round(base_co2 + 16.1 * (cost - 1) * 10) / 10;
      total_tree2 = Math.round(base_tree + 2.4 * (cost - 1) * 10) / 10;
    } else if (fuel == 2) {
      // LPG
      var base_co2 = 27.9;
      var base_tree = 4.2;
      total_co22 = Math.round(base_co2 + 27.8 * (cost - 1) * 10) / 10;
      total_tree2 = Math.round(base_tree + 4.2 * (cost - 1) * 10) / 10;
    }
  } else {
    total_co22 = 0;
    total_tree2 = 0;
  }

  // 2-3번 문항 : 대중교통 이용 횟수(연간기준)
  var co2 = 469.4;
  var tree = 71.1;
  var num = select[4]; // 몇 번 선지
  var freq = qnaList[4].a[select[4]].data[0]; // 빈도

  var total_co23 = Math.round(freq * co2 * 10) / 10;
  var total_tree3 = Math.round(freq * tree * 10) / 10;

  traffic_co2 =
    Math.round(total_co22 * 12 - (total_co21 + total_co23) * 10) / 10;
  traffic_tree =
    Math.round(total_tree2 * 12 - (total_tree1 + total_tree3) * 10) / 10;

  document.getElementById("i_ans1_co2").innerHTML = total_co21;
  document.getElementById("i_ans1_tree").innerHTML = total_tree1; 
  document.getElementById("i_ans2_co2").innerHTML = total_co22;
  document.getElementById("i_ans2_tree").innerHTML = total_tree2;
  document.getElementById("i_ans3_co2").innerHTML = total_co23;
  document.getElementById("i_ans3_tree").innerHTML = total_tree3;

  if (traffic_co2 < 0) {
    $("#traffic").append(
      `<span>연간 CO2 절감량 : ${
        traffic_co2 * -1
      }kg <br>연간 아끼고 있는 소나무 : ${traffic_tree * -1}그루</span>`
    );
  } else {
    $("#traffic").append(
      `<span>연간 CO2 배출량 : ${traffic_co2}kg <br>연간 필요한 소나무 : ${traffic_tree}그루</span>`
    );
  }
}

function calAircondition() {
  var tree3; //3번 문항 소비한 소나무
  var co2_3; //3번 문항 발생시킨 co2
  var tree4; //4번 문항 절약한 소나무
  var co2_4; //4번 문항 절약한 co2
  var if_co2;  // 조건문에 넣을 값
  var if_tree; // 조건문에 넣을 값
  
  // 3번 문항 : 에어컨 사용 시간  ,  3-1번 문항 : 에어컨 사용 온도
  var target3 = qnaList[5].a[select[5]];
  var target3_1 = qnaList[6].a[select[6]];
  // 3번 문항과 3-1번 문항 곱하여 계산 = 사용시간 * 사용온도 (단위: 30일동안 사용한 kW)

  var ans3 = Math.round(target3.data[0] * target3_1.data[0] * 30 * 10) / 10;
  // kw를 소나무와 co2로 환산
  tree3 = Math.round(ans3 * 0.1 * 10) / 10;
  co2_3 = Math.round(ans3 * 0.5 * 10) / 10;

  console.log("에어컨 사용에 따라 필요한 소나무 : ", tree3, "그루");
  console.log("에어컨 사용에 따라 발생하는 이산화탄소 : ", co2_3, "kg");

  //4번 문항 : 단열재 사용여부
  var target4 = qnaList[7].a[select[7]];
  var ans4 = Math.round(target4.data[0] * 10) / 10;

  //ans4 == 1 이면 단열재 사용한다, 0 이면 사용 안한다.
  if (ans4 == 1) {
    tree4 = 10.8 / 12; // 단위 : 그루 (1달)
    co2_4 = 71.4 / 12; // 단위 : kg (1달)
  } else {
    tree4 = 0;
    co2_4 = 0;
  }

  console.log("단열재 사용에 따라 절약한 소나무 : ", tree4, "그루");
  console.log("단열재 사용에 따라 절약한 이산화탄소 : ", co2_4, "kg");

  //단위 : 1년
  totalAir_tree = Math.round((tree3 - tree4) * 12 * 10) / 10; // 3번은 필요한 소나무, 4번은 절약한 소나무여서 뺄셈 계산)
  totalAir_co2 = Math.round((co2_3 - co2_4) * 12 * 10) / 10; //  3번은 필요한 co2, 4번은 절약한 co2여서 뺼셈 계산

  

  if(totalAir_tree < 0) // 에어컨 사용안하고 단열재 사용하는 경우 
  {
    console.log("현재 냉/난방기 사용습관으로 아끼고 있는 소나무 : ",totalAir_tree,"그루");
  }
  else
  {
    console.log("현재 냉/난방기 사용습관으로 필요한 소나무 : ",totalAir_tree,"그루");
  }  
  
  if( totalAir_co2 < 0) // 에어컨 사용안하고 단열재 사용하는 경우
  {
    console.log("현재 냉/난방기로 사용습관으로 절약하고 있는 이산화탄소 : ",totalAir_co2,"kg");
  }
  else
  {
    console.log("현재 냉/난방기 사용습관으로 배출하고 있는 이산화탄소 : ",totalAir_co2,"kg");  
  }
  // 소수점 첫째자리까지 표현
  tree3=tree3.toFixed(1);
  co2_3=co2_3.toFixed(1);
  tree4=tree4.toFixed(1);
  co2_4=co2_4.toFixed(1);
  totalAir_tree=totalAir_tree.toFixed(1);
  totalAir_co2=totalAir_co2.toFixed(1);

 
  if_co2 = totalAir_co2;
  if_tree = totalAir_tree;
  document.getElementById("i_ans3").innerHTML=co2_3;
  document.getElementById("i_ans4").innerHTML=co2_4; // 단열재 사용으로 절약한 co2
  //document.getElementById("i_totalAir_co2").innerHTML= totalAir_co2;
  //document.getElementById("i_totalAir_tree").innerHTML= totalAir_tree;

 if(if_co2<0){
  $('#totalAir').append(`<span>연간 CO2 절감량 : ${if_co2*(-1)}kg <br></span>`);
}
 if(if_tree<0){
  $('#totalAir').append(`<span>연간 아낀 소나무 : ${if_tree*(-1)}그루 <br> </span>`); 
}
 else{
  $('#totalAir').append(`<span>연간 CO2 배출량 : ${if_co2}kg <br>연간 필요 소나무 : ${totalAir_tree}그루</span>`);
}
}

function calElectricity() {
  var target = [];
  var ans = [];

  for (var i = 8; i < 12; i++) {
    target.push(qnaList[i].a[select[i]]);
  }

  //6번 문항 : TV 시청 시간
  ans[0] = Math.round(target[0].data[0] * 150); // 하루 전력량 w
  ans[0] = (ans[0] * 7 * 52) / 1000;
  ans[0] = parseFloat((ans[0] / 2).toFixed(1));
  console.log("TV 시청 시간에 따라 발생하는 이산화탄소 : ", ans[0], "kg");

  //7번 문항 : 컴퓨터 사용 시간
  ans[1] = Math.round(target[1].data[0] * 255.9); // 하루 전력량 w
  ans[1] = (ans[1] * 7 * 52) / 1000;
  ans[1] = parseFloat((ans[1] / 2).toFixed(1));
  console.log("컴퓨터 사용 시간에 따라 발생하는 이산화탄소 : ", ans[1], "kg");

  //8번 문항 : 세탁기 사용 횟수
  ans[2] = Math.round(target[2].data[0] * 242.8); // 하루 전력량 w
  ans[2] = (ans[2] * 7 * 52) / 1000;
  ans[2] = parseFloat((ans[2] / 2).toFixed(1));
  console.log("세탁기 사용 횟수에 따라 발생하는 이산화탄소 : ", ans[2], "kg");

  // 9번 문항 : 외출시 플러그 뽑는지 o/x
  // 뽑으면 [1], 안뽑으면 [0]
  var plug = 0;
  if (target[3].data[0] == 1) {
    plug = 12.6;
    console.log(
      "사용하지 않는 플러그를 뽑아 절약하고 있는 이산화탄소 : ",
      plug,
      "kg"
    );
  }

  //전기분야 연간 CO2배출량 및 필요 소나무 계산
  elec_result = 0;

  for (var i = 0; i < 3; i++) {
    elec_result += ans[i];
    //console.log(elec_result, "\n");
  }

  elec_result -= plug;

  //console.log(elec_result, "\n");
  elec_result = elec_result.toFixed(1);

  // ans[0] = ans[0].toFixed(1);
  // ans[1] = ans[1].toFixed(1);
  // ans[2] = and[2].toFixed(1);
  // plug = plug.toFixed(1);
  // elec_result = elec_result.toFixed(1);
  // need_tree = need_tree.toFixed(1);
  console.log("전기분야 1주일 간 이산화탄소 배출량 : ", elec_result, "kg");
  need_tree = Math.round(elec_result / 5); //이산화 탄소 배출량 0.5kg당 필요 소나무 0.1그루
  need_tree = need_tree.toFixed(1);
  console.log("사용한 전기 때문에 필요한 소나무 : ", need_tree, "그루");

  document.getElementById("i_ansTv").innerHTML = ans[0];
  document.getElementById("i_ansComputer").innerHTML = ans[1];
  document.getElementById("i_ansWashing").innerHTML = ans[2];
  document.getElementById("i_ansPlug").innerHTML = plug;

  if (elec_result < 0) {
    document.getElementById("i_totalElec_co2").innerHTML =
      "연간 CO2 절감량 : " + -elec_result + "kg";
    document.getElementById("i_totalElec_tree").innerHTML =
      "보호된 소나무 : " + -need_tree + "그루";
  } else {
    document.getElementById("i_totalElec_co2").innerHTML =
      "연간 CO2 배출량 : " + elec_result + "kg";
    document.getElementById("i_totalElec_tree").innerHTML =
      "필요한 소나무 : " + need_tree + "그루";
  }
}

function calResource() {
  //10번 문항 : 종이청구서
  var target10 = qnaList[12].a[select[12]];
  var ans10 = Math.round(target10.data[0] * 2.8 * 10) / 10; //결과값 소수 첫번째자리까지만 표기하도록 반올림
  //console.log("종이청구서로 발생하는 이산화탄소 : ",ans10,"g");

  //11번 문항 : 샤워시간
  var target11 = qnaList[13].a[select[13]];
  var ans11 = Math.round(target11.data[0] * 74 * 10) / 10;
  //console.log("샤워시간으로 발생하는 이산화탄소 : ",ans11,"g");

  //12번 문항 : 음식물 쓰레기 배출
  var target12 = qnaList[14].a[select[14]];
  var ans12 = Math.round(target12.data[0] * 3300 * 10) / 10;
  //console.log("음식물 쓰레기 배출로 발생하는 이산화탄소 : ",ans12,"g");

  //13번 문항 : 배달음식 주문 횟수
  var target13 = qnaList[15].a[select[15]];
  var ans13 = Math.round(target13.data[0] * 0.15 * 10) / 10;
  //console.log("배달음식 주문 횟수에 따라 발생하는 이산화탄소 : ",ans13,"g");

  //자원분야 연간 CO2배출량 및 필요 소나무 계산
  resource_result =
    Math.round(
      ((ans10 * 12 + ans11 * 243 + ans12 * 52 + ans13 * 52) / 1000) * 10
    ) / 10;
  //console.log("자원분야 1년간 이산화탄소 배출량 : ",resource_result,"kg");
  resource_need_tree = Math.round(((resource_result / 6.6) * 10) / 10); //이산화 탄소 배출량 6.6kg당 필요 소나무 1그루
  //console.log("필요한 소나무 : ",need_tree,"그루");
  document.getElementById("i_ans10").innerHTML = ans10 / 1000;
  document.getElementById("i_ans11").innerHTML = ans11 / 1000;
  document.getElementById("i_ans12").innerHTML = ans12 / 1000;
  document.getElementById("i_ans13").innerHTML = ans13 / 1000;
  document.getElementById("i_resource_result").innerHTML = resource_result;
  document.getElementById("i_need_tree").innerHTML = resource_need_tree;
}

function calTotal(){
  var Total_result; 
  var Total_need_tree;

  calAircondition();
  calElectricity();
  calResource();

  Total_result = elec_result*1 + totalAir_co2*1 + resource_result*1;
  Total_need_tree = need_tree*1 + totalAir_tree*1 + resource_need_tree*1;
  //소수점 첫째자리 표현
  Total_result=Total_result.toFixed(1);
  Total_need_tree=Total_need_tree.toFixed(1);


  document.getElementById("total_resultt").innerHTML = Total_result;
  document.getElementById("total_needd").innerHTML = Total_need_tree;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450);
  });
  calTraffic();
  calAircondition();
  calElectricity();
  calResource();
  calTotal();
  result_accordian();
}

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector(".answerBox");
  var answer = document.createElement("button"); // button을 만들어서 answer변수에 담게 된다
  answer.classList.add("answerList"); // 만든 버튼 여러개에는 selector가 없어서 answer에 answerList라는 클래스 값을 만들어준다

  /* css 관련 속성 */
  answer.classList.add("my-4");
  answer.classList.add("py-3");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");

  a.appendChild(answer); // answer변수가 answerBox에 소속될 수 있도록 appendChild 사용
  answer.innerHTML = answerText;

  answer.addEventListener(
    "click",
    function () {
      //지정한 이벤트가 대상에 전달될 때마다 호출할 함수 설정
      var children = document.querySelectorAll(".answerList"); // 버튼 여러개를 다 받아온다.
      for (let i = 0; i < children.length; i++) {
        children[i].disabled = true; //버튼 비활성화
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
        children[i].style.animation = "fadeOut 0.5s";
      }

      setTimeout(() => {
        select[qIdx] = idx; //몇 번째 질문에서 몇 번째 대답을 클릭했는지?
        //       var target = qnaList[qIdx].a[idx].type;
        //       for(let i = 0; i < target.length; i++){
        //         select[target[i]] += 1;
        //       }

        for (let i = 0; i < children.length; i++) {
          children[i].style.display = "none";
        }
        if (qIdx == 1 && select[qIdx] == 1) {
          // 자동차를 운행하지 않는 사람인 경우 자동차 관련 질문 뛰어넘기
          qIdx += 4;
          goNext(qIdx);
        } else if (qIdx == 5 && select[qIdx] == 0) {
          // 에어컨을 사용하지 않는 경우 에어컨 온도 질문 뛰어넘기
          qIdx += 2;
          goNext(qIdx);
        } else goNext(++qIdx); //버튼이 넘어갈 때마다 적용하기
      }, 450);
    },
    false
  );
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    // 질문이 끝나면 결과창으로 넘어가기
    goResult();
    return;
  }

  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q; // 질문 받아오기

  for (let i in qnaList[qIdx].a) {
    // 질문에 대한 답변 하나씩 불러오기
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector(".statusBar");
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
}

function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";

  // 타이머가 만료된 뒤 함수나 지정된 코드를 실행하는 타이머 설정 setTimeout
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450); // 0.45초 이후에 실행될 코드 = main화면이 사라지고 qna를 보여준다
    let qIdx = 0;
    goNext(qIdx);
  }, 450); // 이 안에 있는 코드는 0.45 초 이후에 실행될 코드 = main화면이 사라지고 나서 qna화면 나오기 시작
}

function result_accordian() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
      this.classList.toggle("active");

      /* Toggle between hiding and showing the active resource */
      var resource = this.nextElementSibling;
      if (resource.style.display === "block") {
        resource.style.display = "none";
      } else {
        resource.style.display = "block";
      }
    });
  }
}
