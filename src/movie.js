import axios from 'axios';
import cheerio from 'cheerio';
import { CGV_URL } from './constants.js';
import {url} from './url.js';
import {formatDate} from './date.js';

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
        const link = $(timeTableElem).find('a').attr('href');

        return {
          time,
          seats,
          link: CGV_URL + link,
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
      theater,
      date: formatDate(date.toString()),
      hallList,
    }
  })

  return movieList;
}

export const filter = (movieList, title, type) => {
  const titleMovie = movieList.find(movie => movie.title === title);

  return {...titleMovie, hallList: [...titleMovie.hallList.filter(hall => hall.type === type)]};
}

export const template = (movie) => {
  return `
    <h1>${movie.theater} ${movie.title}</h1>
    <div>${movie.date}</div>
    <ul>
      ${movie.hallList.map(hall => `
        <li>
          <h2>${hall.type}</h2>
          <ul>
            ${hall.timeTables.map(timeTable => `
              <li>
                <a href=${timeTable.link}>
                  <strong>${timeTable.time}</strong><br/>
                  <b>${timeTable.seats}</b> / <b>${hall.totalSeats}</b>
                </a>
              </li>
            `).join('')}
          </ul>
        </li>
      `).join('')}
    </ul>
  `;
}