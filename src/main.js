import {getMovieList, filter} from './movie.js';

async function main() {
  const movieList = await getMovieList('용산아이파크몰', 20211218);
  console.log(JSON.stringify(movieList, null, 2))
  // console.log(filter(movieList, '스파이더맨-노 웨이 홈', 'IMAX LASER 2D'))
}

main();
