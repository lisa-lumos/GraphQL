// use await, because the fetch function returns a
// "Promise of a Response",
// so also need to declare the fetchGreeting() function
// as async
async function fetchGreeting() {
  // This fetch api is available globally,
  // in any modern browser
  const response = await fetch(
    'http://localhost:9000/', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ // convert js obj to string
        query: 'query { greeting }'
      })
    }
  );

  const responseObj = await response.json(); // convert the response to an object, then destructure it
  const {data} = responseObj;
  // console.log(`response: ${responseObj}`); // this will only show it is an object, will not print its content
  console.log('response: ', responseObj);
  return data.greeting;
}

fetchGreeting().then((responseValue) => {
  document.getElementById('api-response').textContent = responseValue;
});