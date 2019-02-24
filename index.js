/**
 * @param {Number} visit
 * @param {Array} precentages
 * @return {Number} index
 */
export default function splitTestSelector(visit, precentages) {
  const seq = (visit - 1) % precentages.length
  return seq
}