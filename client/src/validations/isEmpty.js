export default function isEmpty(data) {
  data === undefined ||
  data === null
  (typeof data === 'object' && Object.keys(data).length ===0) 
};
