import {getMovieList, filter, template} from './movie.js';
import {sendEmail} from './email.js';

async function main() {
  const movieList = await getMovieList('용산아이파크몰', 20211218);
  // console.log(JSON.stringify(movieList, null, 2))
  const filteredMovie = filter(movieList, '스파이더맨-노 웨이 홈', 'IMAX LASER 2D');
  if (filteredMovie.hallList.length) {
    // console.log(JSON.stringify(filteredMovie, null, 2))
    sendEmail(template(filteredMovie));
  }
}

main();
