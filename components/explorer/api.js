import {API_URL} from '../config';

export function loadBlocks(youngestBlockNumber) {
  const url = new URL(API_URL + "blocks");

  if (youngestBlockNumber) {
    url.searchParams.append('last', youngestBlockNumber);
    url.searchParams.append('cb', Date.now());
  }

  return fetch(url).then(res => res.json());
}


export function loadAccount(address) {
  const url = new URL(API_URL + "accounts/" + address);

  return fetch(url).then(res => res.json());
}
