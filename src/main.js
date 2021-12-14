import {getMovieList, filter, template} from './movie.js';
import {sendEmail} from './email.js';

async function main() {
  const dateList = Array.from({length: 7}, (_, i) => i + 20211225);
  const iparksMovieList = await Promise.all(dateList.map(v => getMovieList('용산아이파크몰', v)));
  const imaxFilteredMovieList = iparksMovieList.map(v => filter(v, '스파이더맨-노 웨이 홈', 'IMAX LASER 2D'));

  if (imaxFilteredMovieList.some(({hallList}) => hallList.length)) {
    const templates = imaxFilteredMovieList.map(template);
    sendEmail(templates.join('\n\n'));
  } else {
    console.log('상영관이 없습니다.');
  }

  console.log(JSON.stringify(imaxFilteredMovieList, null, 2));
}

main();
