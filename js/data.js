// 총 질문 16개
const qnaList = [
    // 1. 교통
    {
      q: '1. 가까운 거리는 도보나 자전거를 이용하는 횟수는? ',
      a: [
        { answer: '이용하지 않는다', data: [0] },
        { answer: '1회 이상 3회 미만', data: [2] },
        { answer: '3회 이상 5회 미만', data: [4] },
        { answer: '5회 이상 7회 미만', data: [6] },
        { answer: '7회 이상', data: [7] },
      ]
    },
    {
      q: '2. 자동차 운행을 하시나요?', // 1번 인덱스
      a: [
        { answer: 'YES'},
        { answer: 'NO'},
      ]
    },
    {
      q: '2-1. 이용하는 자동차의 연료 종류는 무엇인가요?',
      a: [
        { answer: '휘발유', data:[0]},
        { answer: '경유', data:[1]},
        { answer: 'LPG', data:[2]},
      ]
    },
    {
      q: '2-2. 한달 평균 연료비는 얼마인가요?',
      a: [
        { answer: '15만원 미만', data: [15] },
        { answer: '15만원 이상 20만원 미만', data: [17.5]},
        { answer: '20만원 이상 25만원 미만', data: [22.5] },
        { answer: '25만원 이상 30만원 미만', data: [27.5] },
        { answer: '30만원 이상', data: [30] },
      ]
    },
    {
      q: '2-3. 일주일에 대중교통을 얼마나 이용하시나요?', // 4번 인덱스
      a: [
        { answer: '이용하지 않는다', data:[0]},
        { answer: '1회 이상 5회 미만', data:[3]},
        { answer: '5회 이상 10회 미만', data:[7.5] },
        { answer: '10회 이상 15회 미만', data:[12.5]},
        { answer: '15회 이상 20회 미만',data:[17.5]},
      ]
    },
    // 2. 냉/난방
    {
      q: '3. 여름철 에어컨 사용 시간이 어느정도 인가요?', //5번 인덱스
      a: [
        { answer: '사용하지 않는다', type: ['dragon', 'chick', 'pig' ] },
        { answer: '1시간 이상 4시간 미만', type: ['mouse', 'rabbit', 'horse', 'dog' ] },
        { answer: '4시간 이상 7시간 미만', type: ['cow', 'sheep', 'tiger', 'snake', 'monkey' ] },
        { answer: '7시간 이상 11시간 미만', type: ['cow', 'sheep', 'tiger', 'snake', 'monkey' ] },
        { answer: '11시간 이상 15시간 미만', type: ['cow', 'sheep', 'tiger', 'snake', 'monkey' ] },
      ]
    },
    {
      q: '3-1. 에어컨 평균 설정 온도는 몇 도인가요?',
      a: [
        { answer: '18도 미만', type: ['cow', 'sheep', 'pig' ] },
        { answer: '19도 이상 21도 미만', type: ['tiger', 'dragon', 'chick' ] },
        { answer: '22도 이상 24도 미만', type: ['mouse', 'rabbit', 'horse', 'snake', 'dog', 'monkey' ] },
        { answer: '25도 이상', type: ['mouse', 'rabbit', 'horse', 'snake', 'dog', 'monkey' ] },
      ]
    },
    {
      q: '4. 보일러가 아닌 단열재로 열 손실을 방지하고 있나요?', // 7번 인덱스
      a: [
        { answer: 'YES', type: ['mouse', 'dragon', 'chick' ] },
        { answer: 'NO', type: ['rabbit', 'tiger', 'horse', 'snake', 'dog', 'monkey' ] },
      ]
    },
    // 3. 전기
    {
      q: '5. 하루에 TV를 몇 시간 정도 시청하나요?',
      a: [
        { answer: 'TV 시청을 하지 않는다', type: ['sheep', 'mouse', 'snake', 'chick' ] },
        { answer: '0시간 이상 3시간 미만', type: ['cow', 'rabbit', 'horse', 'pig' ] },
        { answer: '3시간 이상 6시간 미만', type: ['tiger', 'dog', 'monkey', 'dragon' ] },
        { answer: '6시간 이상 9시간 미만', type: ['tiger', 'dog', 'monkey', 'dragon' ] },
        { answer: '9시간 이상 12시간 미만', type: ['tiger', 'dog', 'monkey', 'dragon' ] },
      ]
    },
    {
      q: '6. 하루에 컴퓨터를 몇 시간 정도 이용하나요?',
      a: [
        { answer: '컴퓨터를 이용하지 않는다', type: ['dragon', 'chick', 'pig'] },
        { answer: '0시간 이상 3시간 미만', type: ['cow', 'rabbit', 'horse', 'pig' ] },
        { answer: '3시간 이상 6시간 미만', type: ['tiger', 'dog', 'monkey', 'dragon' ] },
        { answer: '6시간 이상 9시간 미만', type: ['tiger', 'dog', 'monkey', 'dragon' ] },
        { answer: '9시간 이상 12시간 미만', type: ['tiger', 'dog', 'monkey', 'dragon' ] },
      ]
    },
    {
      q: '7. 세탁기를 일주일에 몇 번 돌리나요? ',
      a: [
        { answer: '세탁기를 사용하지 않는다', type: ['cow', 'dragon', 'chick', 'pig' ] },
        { answer: '1회', type: ['sheep', 'mouse', 'rabbit', 'horse', 'dog'] },
        { answer: '2회', type: ['tiger', 'snake', 'monkey' ] },
        { answer: '3회', type: ['tiger', 'snake', 'monkey' ] },
        { answer: '4회', type: ['tiger', 'snake', 'monkey' ] },
      ]
    },
    {
      q: '8. 외출 시 또는 자리를 비울 시에 플러그를 뽑는 습관이 있나요?',
      a: [
        { answer: 'YES', type: ['mouse', 'dragon', 'chick' ] },
        { answer: 'NO', type: ['rabbit', 'tiger', 'horse', 'snake', 'dog', 'monkey' ] },
      ]
    },
    // 4. 자원
    {
      q: '9. 한 달에 종이청구서를 받는 횟수가 몇 번인가요?', //12번 인덱스
      a: [
        { answer: '종이청구서를 받지 않는다', data: [0] },
        { answer: '1회 이상 3회 미만', data: [2] },
        { answer: '3회 이상 5회 미만', data: [4] },
        { answer: '5회 이상 7회 미만', data: [6] },
        { answer: '8회 이상', data: [8] },
      ]
    },
    {
      q: '10. 평균 사워 시간이 몇 분인가요?',
      a: [
        { answer: '5분 미만', data: [3] },
        { answer: '5분 이상 10분 미만', data: [7.5] },
        { answer: '10분 이상 15분 미만', data: [12.5] },
        { answer: '15분 이상 20분 미만', data: [17.5] },
        { answer: '20분 이상', data: [20] },
      ]
    },
    {
      q: '11. 일주일에 몇 번 배달 음식 주문하나요?',
      a: [
        { answer: '배달음식을 주문하지 않는다', data: [0] },
        { answer: '1회 이상 4회 미만', data: [2.5] },
        { answer: '4회 이상 7회 미만', data: [5.5] },
        { answer: '7회 이상 10회 미만', data: [8.5] },
        { answer: '10회 이상', data: [10] },
      ]
    },
    {
      q: '12. 일주일에 몇 번 음식물 쓰레기를 배출하나요?',
      a: [
        { answer: '음식물 쓰레기를 배출하지 않는다', data: [0] },
        { answer: '1회 이상 3회 미만', data: [2] },
        { answer: '3회 이상 5회 미만', data: [4] },
        { answer: '5회 이상 7회 미만', data: [6] },
        { answer: '7회 이상', data: [7] },
      ]
    }
  ]