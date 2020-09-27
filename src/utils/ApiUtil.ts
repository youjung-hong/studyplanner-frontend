const API_SERVER = process.env.REACT_APP_API_SERVER;

console.log('API_SERVER', process.env)

function get(url = '') {
  const abortController = new AbortController();

  // Default options are marked with *
  console.log(`[GET ${url}] REQUEST`);

  const timerId = setTimeout(() => {
    console.log(`[GET ${url}] TIMEOUT`);
    abortController.abort();
    alert(`[GET ${url}] TIMEOUT`)
  }, 20000);

  return fetch(API_SERVER + url, {
    signal: abortController.signal
  })
    .then((res) => {
      console.log(`[GET ${url}] SUCCESS`, res)
      clearTimeout(timerId)
      return res.json();
    }).catch(err => {
      console.log(`[GET ${url}] ERROR`, err)
      clearTimeout(timerId)
      alert(`[GET ${url}] ERROR`)
    });
}

function post(url = '', data = {}) {
  const abortController = new AbortController();

  // Default options are marked with *
  console.log(`[POST ${url}] REQUEST`);

  const timerId = setTimeout(() => {
    console.log(`[POST ${url}] TIMEOUT`);
    abortController.abort();
    alert(`[POST ${url}] TIMEOUT`);
  }, 20000);

  // Default options are marked with *
  return fetch(API_SERVER + url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      signal: abortController.signal
  }).then((res) => {
    console.log(`[POST ${url}] SUCCESS`, res)
    clearTimeout(timerId)
    return res.json();
  }).catch(err => {
    console.log(`[POST ${url}] ERROR`, err)
    clearTimeout(timerId)
    alert(`[POST ${url}] ERROR`)
  });
}

function put(url = '', data = {}) {
  const abortController = new AbortController();

  // Default options are marked with *
  console.log(`[PUT ${url}] REQUEST`);

  const timerId = setTimeout(() => {
    console.log(`[PUT ${url}] TIMEOUT`);
    abortController.abort();
    alert(`[PUT ${url}] TIMEOUT`)
  }, 20000);

  return fetch(API_SERVER + url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
      signal: abortController.signal
  }).then((res) => {
    console.log(`[PUT ${url}] SUCCESS`, res)
    clearTimeout(timerId)
    return res.json();
  }).catch(err => {
    console.log(`[PUT ${url}] ERROR`, err)
    clearTimeout(timerId)
    alert(`[PUT ${url}] ERROR`)
  });
}

function deleteOne(url = '') {
  const abortController = new AbortController();

  // Default options are marked with *
  console.log(`[DELETE ${url}] REQUEST`);

  const timerId = setTimeout(() => {
    console.log(`[DELETE ${url}] TIMEOUT`);
    abortController.abort();
    alert(`[DELETE ${url}] TIMEOUT`)
  }, 20000);

  return fetch(API_SERVER + url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    signal: abortController.signal
  }).then((res) => {
    console.log('res = ', res)
    console.log(`[DELETE ${url}] SUCCESS`, res)
    clearTimeout(timerId)
  }).catch(err => {
    console.log(`[DELETE ${url}] ERROR`, err)
    clearTimeout(timerId)
    alert(`[DELETE ${url}] ERROR`)
  });
}

export default {
  get,
  post,
  put,
  delete: deleteOne
}