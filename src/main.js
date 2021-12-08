import {getMovieList, filter, template} from './movie.js';
import {sendEmail} from './email.js';

async function main() {
  const hongdea = await getMovieList('홍대', 20211218);
  const sinchon = await getMovieList('신촌아트레온', 20211218);
  const yeonnam = await getMovieList('연남', 20211218);
  // console.log(JSON.stringify(hongdea, null, 2))

  const hongdeaSpider = filter(hongdea, '스파이더맨-노 웨이 홈', '2D');
  const sinchonSpider = filter(sinchon, '스파이더맨-노 웨이 홈', '2D');
  const yeonnamSpider = filter(yeonnam, '스파이더맨-노 웨이 홈', '2D');

  if (hongdeaSpider.hallList.length > 0 || sinchonSpider.hallList.length > 0 || yeonnamSpider.hallList.length > 0) {
    sendEmail(template(hongdeaSpider) + template(sinchonSpider) + template(yeonnamSpider));
  } else {
    console.log('상영관이 없습니다.');
  }

  console.log(JSON.stringify(hongdea, null, 2))
  console.log(JSON.stringify(sinchon, null, 2))
  console.log(JSON.stringify(yeonnam, null, 2))
}

main();
