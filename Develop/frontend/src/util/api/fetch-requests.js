/**
 * Performs a fetch with a post method.
 *
 * @param {*} path of the backend resource.
 * @param {*} data to post.
 * @returns redirect if t
 */
export async function postData(path, data) {
  const response = await fetch(resolveBackendPath(path), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (isUnauthorized(response)) {
    return redirect(LOGIN);
  }
}

/**
 * Performs a get without query parameters.
 *
 * @param {*} path of the backend resource.
 * @returns response promise.
 */
export async function get(path) {
  await fetch(resolveBackendPath(path), {
    method: "GET",
    credentials: "include",
  });
  if (isUnauthorized(response)) {
    return redirect(LOGIN);
  }
  return response;
}

export async function getWithData(path, data) {
  await fetch(resolveBackendPath(path + "?" + data), {
    method: "GET",
    credentials: "include",
  });

  if (isUnauthorized(response)) {
    return redirect(LOGIN);
  }
}
