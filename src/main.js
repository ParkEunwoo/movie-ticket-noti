import {getMovieList, filter, template} from './movie.js';
import {sendEmail} from './email.js';

async function main() {
  const hongdea = await getMovieList('홍대', 20211218);
  const sinchon = await getMovieList('신촌아트레온', 20211218);
  const yeonnam = await getMovieList('연남', 20211218);
  // console.log(JSON.stringify(movieList, null, 2))
  const hongdeaSpider = filter(movieList, '스파이더맨-노 웨이 홈', '2D');
  const sinchonSpider = filter(movieList, '스파이더맨-노 웨이 홈', '2D');
  const yeonnamSpider = filter(movieList, '스파이더맨-노 웨이 홈', '2D');
  if (filteredMovie.hallList.length) {
    // console.log(JSON.stringify(filteredMovie, null, 2))
    sendEmail(template(hongdeaSpider) + template(sinchonSpider) + template(yeonnamSpider));
  }
}

main();
