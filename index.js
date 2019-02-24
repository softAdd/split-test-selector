import { Url, urls, users, onUserAppearanc } from "./task";

/**
 * @param {Number} visit
 * @param {Array} precentages
 * @return {Number} index
 */
export default function splitTestSelector(visit, precentages) {
  urls.length = 0;
  users = 0;
  for (let percent of precentages) {
    urls.push(new Url(percent));
  }
  for (let i = 0; i < visit; i++) {
    onUserAppearance();
  }

  return onUserAppearance();
}
