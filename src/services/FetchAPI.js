const fetchAPI = () => {
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(data.value));
  } catch (error) {
    console.log(error);
  }
};

export default fetchAPI;
