// const baseUrl = `http://localhost:8080`;
const baseUrl = `https://3.88.22.170:8080`;

export async function getRequest(url: string, headers = {}) {
  return fetch(baseUrl + url, {
    method: "GET",
    headers: headers
  });
};

export async function postRequest(url: string, body: any, headers = {}) {
  return fetch(baseUrl + url, {
    method: "POST",
    headers: headers,
    body: body
  });
};

export async function putRequest(url: string, body: any, headers = {}) {
  if (body === null) {
    return fetch(baseUrl + url, {
      method: "PUT",
      headers: headers
    });
  }
  return fetch(baseUrl + url, {
    method: "PUT",
    headers: headers,
    body: body
  });
};

export async function deleteRequest(url: string, body: any, headers = {}) {
  if (body === null) {
    return fetch(baseUrl + url, {
      method: "DELETE",
      headers: headers
    });
  }
  return fetch(baseUrl + url, {
    method: "DELETE",
    headers: headers
  });
};