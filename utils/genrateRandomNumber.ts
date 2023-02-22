export default function genrateRandomNumber(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

// Math.random 함수는 0 ~ 1 사이에 실수를 반환
// 즉 0초과 1 미만.
