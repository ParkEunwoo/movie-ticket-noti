import {getMovieList, filter, template} from './movie.js';
import {sendEmail} from './email.js';
import {nextDate} from './date.js';

let date = 20220108;

async function main() {
  const iparkMovieList = await getMovieList('용산아이파크몰', date);
  const imaxFilteredMovie = filter(iparkMovieList, '스파이더맨-노 웨이 홈', 'IMAX LASER 2D');

  if (imaxFilteredMovie.hallList.length > 0) {
    sendEmail(template(imaxFilteredMovie));
    date = nextDate(date);
    main();
  } else {
    console.log('상영관이 없습니다.');
  }

  console.log(JSON.stringify(imaxFilteredMovie, null, 2));
}

main();
