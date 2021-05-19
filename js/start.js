const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 16; // 질문 개수
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 사용자가 버튼 추가할 때마다 어떤거 누른지 추가


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


function calResource(){
  //10번 문항 : 종이청구서
  var target10 = qnaList[12].a[select[12]];
  var ans10 = Math.round(target10.data[0]*2.8 * 10) / 10; //결과값 소수 첫번째자리까지만 표기하도록 반올림
  console.log("종이청구서로 발생하는 이산화탄소 : ",ans10,"g");

  //11번 문항 : 샤워시간
  var target11 = qnaList[13].a[select[13]];
  var ans11 = Math.round(target11.data[0]*74  * 10) / 10;
  console.log("샤워시간으로 발생하는 이산화탄소 : ",ans11,"g");
  
  //12번 문항 : 음식물 쓰레기 배출
  var target12 = qnaList[14].a[select[14]];
  var ans12 = Math.round(target12.data[0]*3300 * 10) / 10;
  console.log("음식물 쓰레기 배출로 발생하는 이산화탄소 : ",ans12,"g");

  //13번 문항 : 배달음식 주문 횟수
  var target13 = qnaList[15].a[select[15]];
  var ans13 = Math.round(target13.data[0]*0.15 * 10) / 10;
  console.log("배달음식 주문 횟수에 따라 발생하는 이산화탄소 : ",ans13,"g");

  //자원분야 연간 CO2배출량 및 필요 소나무 계산
  var resource_result = Math.round((ans10*12+ans11*243+ans12*52+ans13*52)/1000 *10) / 10;
  console.log("자원분야 1년간 이산화탄소 배출량 : ",resource_result,"kg");
  var need_tree = Math.round(resource_result/6.6 * 10 / 10); //이산화 탄소 배출량 6.6kg당 필요 소나무 1그루
  console.log("필요한 소나무 : ",need_tree,"그루");
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    // setResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button'); // button을 만들어서 answer변수에 담게 된다
  answer.classList.add('answerList'); // 만든 버튼 여러개에는 selector가 없어서 answer에 answerList라는 클래스 값을 만들어준다
  
  /* css 관련 속성 */
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer); // answer변수가 answerBox에 소속될 수 있도록 appendChild 사용
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){ //지정한 이벤트가 대상에 전달될 때마다 호출할 함수 설정
    var children = document.querySelectorAll('.answerList'); // 버튼 여러개를 다 받아온다.
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true; //버튼 비활성화
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
  
    setTimeout(() => {
      select[qIdx]=idx; //몇 번째 질문에서 몇 번째 대답을 클릭했는지?
//       var target = qnaList[qIdx].a[idx].type;
//       for(let i = 0; i < target.length; i++){
//         select[target[i]] += 1;
//       }

      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      if(qIdx==2 && select[qIdx]==1){ // 자동차를 운행하지 않는 사람인 경우 자동차 관련 질문 뛰어넘기
        qIdx+=3;
        goNext(qIdx);
      }
      else if(qIdx==5 && select[qIdx]==0){ // 에어컨을 사용하지 않는 경우 에어컨 온도 질문 뛰어넘기
        qIdx+=1;
        goNext(qIdx);
      }
      else
        goNext(++qIdx); //버튼이 넘어갈 때마다 적용하기 
    },450)
  }, false);
}

function goNext(qIdx){
  if(qIdx === endPoint){ // 질문이 끝나면 결과창으로 넘어가기
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q; // 질문 받아오기 
  
  for(let i in qnaList[qIdx].a){ // 질문에 대한 답변 하나씩 불러오기
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i); 
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";

  // 타이머가 만료된 뒤 함수나 지정된 코드를 실행하는 타이머 설정 setTimeout 
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450) // 0.45초 이후에 실행될 코드 = main화면이 사라지고 qna를 보여준다
    let qIdx = 0;
    goNext(qIdx);
  }, 450); // 이 안에 있는 코드는 0.45 초 이후에 실행될 코드 = main화면이 사라지고 나서 qna화면 나오기 시작

}