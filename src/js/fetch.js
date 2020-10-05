const inputRef = document.querySelector('.input');

inputRef.addEventListener('input', handleAnswer);

function handleAnswer(e) {
  const answer = e.currentTarget.value;
  fetch(`https://restcountries.eu/rest/v2/name/${answer}`)
    .then(response => {
      return response.json();
    })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
}
