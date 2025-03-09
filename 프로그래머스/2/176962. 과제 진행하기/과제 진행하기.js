// 문제요약: 과제가 끝난 순서대로 반환
// 알고리즘 선택:
//  시각을 분으로 바꾸기
//  첫번째 과제를 시작, 만약 두 번째 과제의 시작시각이 첫번째 과제 시작시간+소요시간보다 빠르다면,
//      첫번째 과제가 끝나는 시각-두 번째 과제 시작 시각 = 첫번째 과제 남은 시각
//      배열에 저장 후 바로 두 번째 과제 시작
//      만약 두 번째 과제의 시작시각이 첫번째 과제 시작시각 + 소요시간보다 느리다면,
//          첫번째 과제는 바로 리턴
// 부분문제 분해:
//  현재과제={이름, 시작시각, 소요시간} plans.shift()
//  later 배열에 push
//  현재시각=현재과제.시작시각
//  for plans in i:
//      next={이름, 시작시각, 소요시간} plans.shift()
//      next시작시간-time=>남는시간
//      for later in j:
//          later의 첫번째 원소부터 남는시간만큼 소요시간에서 뺌
//          만약 소요시간이 0이 되면 그 과목은 완료
//          남는시간이 0이 될 때까지
//      next를 later의 첫번째로 넣음

function solution(plans) {
  var answer = [];

  const timeToMinute = (str) => {
    let time = 0;
    const [hour, minute] = str.split(":").map(Number);

    time += hour * 60;
    time += minute;

    return time;
  };

  plans = plans.sort((a, b) => timeToMinute(a[1]) - timeToMinute(b[1]));

  const [name, stime, ntime] = plans[0];
  let later = [{ name: name, needTime: Number(ntime) }];

  let time = timeToMinute(stime);
  for (let i = 1; i < plans.length; i++) {
    const [nname, nstime, nntime] = plans[i];
    let remainTime = timeToMinute(nstime) - time;

    const nlater = [{ name: nname, needTime: Number(nntime) }];
    for (let j = 0; j < later.length; j++) {
      let { name, needTime } = later[j];
      if (remainTime === needTime) {
        answer.push(name);
        remainTime = 0;
      } else if (remainTime > needTime) {
        answer.push(name);
        remainTime -= needTime;
      } else if (remainTime < needTime) {
        needTime -= remainTime;
        remainTime = 0;
        nlater.push({ name: name, needTime: Number(needTime) });
      }
    }
    time = timeToMinute(nstime);
    later = [...nlater];
  }

  for (let i = 0; i < later.length; i++) {
    answer.push(later[i].name);
  }

  return answer;
}
