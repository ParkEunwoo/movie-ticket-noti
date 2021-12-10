import {getMovieList, filter, template} from './movie.js';
import {sendEmail} from './email.js';

async function main() {
  const sinchon = await getMovieList('신촌아트레온', 20211218);

  const sinchonSpider = filter(sinchon, '스파이더맨-노 웨이 홈', '2D');

  if (sinchonSpider.hallList.length > 0) {
    sendEmail(template(sinchonSpider));
  } else {
    console.log('상영관이 없습니다.');
  }

  console.log(JSON.stringify(sinchon, null, 2));
}

main();
