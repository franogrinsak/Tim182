import { LOGIN, resolveBackendPath } from "../paths";

function isUnauthorized(response) {
  return response.ok && response.status === 401;
}

function isUnauthorizedInline(response) {
  return !response.ok && response.status === 401;
}

function isUnauthorizedGet(response) {
  return response.status === 401;
}

/**
 * Performs a fetch with a post method, with data in the body of the request.
 *
 * @param {*} path of the backend resource.
 * @param {*} data to post.
 * @returns redirect if the user is not signed in
 */
export async function postDataBody(path, data) {
  let response;
  try {
    response = await fetch(resolveBackendPath(path), {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    throw { message: "Network error" };
  }

  if (isUnauthorized(response)) {
    return redirect(LOGIN);
  }

  if (!response.ok) {
    throw { status: response.status, message: await response.text() };
  }

  return response;
}

export async function postDataBodyInline(path, data) {
  let response;
  try {
    response = await fetch(resolveBackendPath(path), {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    throw { message: "Network error" };
  }

  if (isUnauthorizedInline(response)) {
    window.location.replace(LOGIN);
    return false;
  }

  if (!response.ok) {
    throw { status: response.status, message: await response.text() };
  }

  return true;
}

/**
 * Performs a fetch with a post method, with data in the query parameters of the request.
 *
 * @param {*} path of the backend resource.
 * @param {*} data to post.
 * @returns redirect if the user is not signed in
 */
export async function postDataParams(path, data) {
  let response;
  try {
    response = await fetch(resolveBackendPath(`${path}?${data}`), {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error(err);
    throw { message: "Network error" };
  }

  if (isUnauthorized(response)) {
    return redirect(LOGIN);
  }

  if (!response.ok) {
    throw { status: response.status, message: await response.text() };
  }

  return response;
}

export async function postDataParamsInline(path, data) {
  let response;
  try {
    response = await fetch(resolveBackendPath(`${path}?${data}`), {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error(err);
    throw { message: "Network error" };
  }

  if (isUnauthorizedInline(response)) {
    window.location.replace(LOGIN);
    return false;
  }

  if (!response.ok) {
    throw { status: response.status, message: await response.text() };
  }

  return true;
}

/**
 * Performs a get without query parameters.
 *
 * @param {*} path of the backend resource.
 * @returns response promise.
 */
export async function get(path) {
  let response;
  try {
    response = await fetch(resolveBackendPath(path), {
      method: "GET",
      credentials: "include",
    });
  } catch (err) {
    console.error(err);
    throw { message: "Network error" };
  }

  if (isUnauthorizedGet(response)) {
    return redirect(LOGIN);
  }

  return response.json();
}

export async function getWithParams(path, data) {
  let response;
  try {
    response = await fetch(resolveBackendPath(path + "?" + data), {
      method: "GET",
      credentials: "include",
    });
  } catch (err) {
    console.error(err);
    throw { message: "Network error" };
  }

  if (isUnauthorizedGet(response)) {
    return redirect(LOGIN);
  }

  return await response.json();
}

export async function getWithParamsInline(path, data) {
  let response;
  try {
    response = await fetch(resolveBackendPath(path + "?" + data), {
      method: "GET",
      credentials: "include",
    });
  } catch (err) {
    console.error(err);
    throw { message: "Network error" };
  }

  if (isUnauthorizedGet(response)) {
    window.location.replace(LOGIN);
    return false;
  }

  return await response.json();
}

export async function getWithParamsInlineWithRedirectData(path, data) {
  let response;
  try {
    response = await fetch(resolveBackendPath(path + "?" + data), {
      method: "GET",
      credentials: "include",
    });
  } catch (err) {
    console.error(err);
    throw { message: "Network error" };
  }

  if (isUnauthorizedGet(response)) {
    window.location.replace(LOGIN);
    return { redirected: true, response: response };
  }

  return { redirected: false, response: await response.json() };
}
