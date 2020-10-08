const axios = require('axios').default;

function downloadFile() {
  axios
    .get('https://restcountries.eu/rest/v2/name/eesti')
    .then(response => {
      return response;
    })
    .then(data => {
      console.log(data.data[0]);
    })
    .catch(error => {
      console.log(error);
    });
}
// downloadFile();

axios
  .get('https://restcountries.eu/rest/v2/all', {
    name: 'Italy',
  })
  .then(resp => {
    return resp;
  })
  .then(res => {
    console.log(res);
  });
