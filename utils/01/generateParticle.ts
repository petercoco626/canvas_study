import genrateRandomNumber from "./genrateRandomNumber";
import Particle from "./Particle";

interface IGenerateParticle {
  count: number;
  maxX: number;
}

function generateParticle({ count, maxX }: IGenerateParticle) {
  const particleArr = [];

  for (let i = 0; i < count; i++) {
    const randomX = genrateRandomNumber(0, maxX);
    const randomY = genrateRandomNumber(0, 100);
    const randomRadius = genrateRandomNumber(10, 30);
    const randomVy = genrateRandomNumber(1, 3);

    particleArr.push(new Particle(randomX, randomY, randomRadius, randomVy));
  }

  return particleArr;
}

export default generateParticle;
