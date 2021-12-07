import { BASE_URL, THEATER_CODE } from "./constants.js"

export const url = (theater, date) => {
  return `${BASE_URL}?areacode=01&theaterCode=${THEATER_CODE[theater]}&date=${date}`;
}