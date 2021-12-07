import axios from 'axios';
import cheerio from 'cheerio';
import {url} from './url.js';

export async function getMovieList (theater, date) {
  const {data} = await axios.get(url(theater, date));

  const $ = cheerio.load(data);

  const $list = $('div.sect-showtimes > ul').children('li');

  const movieList = Array.from($list).map(elem => {
    const title = $(elem).find('div.info-movie > a > strong').text().trim();

    const $hallList = $(elem).find('div.type-hall');

    const hallList = Array.from($hallList).map(hallElem => {
      const hallInfo = $(hallElem).find('div.info-hall > ul').children('li');

      const type = $(hallInfo[0]).text().trim();
      const totalSeats = $(hallInfo[2]).text().split('총\n').join('').trim();

      const $timeTables = $(hallElem).find('div.info-timetable > ul').children('li');

      const timeTables = Array.from($timeTables).map(timeTableElem => {
        const time = $(timeTableElem).find('em').text().trim();
        const seats = $(timeTableElem).find('span.txt-lightblue').text().substring(4).trim() || '매진';

        return {
          time,
          seats,
        };
      });

      return {
        type,
        totalSeats,
        timeTables,
      };
    });

    return {
      title,
      hallList,
    }
  })

  return movieList;
}

export const filter = (movieList, title, type) => {
  const titleMovie = movieList.find(movie => movie.title === title);

  return titleMovie.hallList.filter(hall => hall.type === type);
}
