import { requireAuth } from "./auth";
import {
  BACKEND_ADD_COURT,
  BACKEND_ADD_TOURNAMENT,
  BACKEND_LOGGED,
  LOGIN,
  resolveBackendPath,
} from "./paths";

function isUnauthorized(response) {
  return response.ok && response.status === 401;
}

async function postData(path) {
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
  return response;
}

async function get(path) {
  await fetch(resolveBackendPath(path), {
    method: "GET",
    credentials: "include",
  });
  if (isUnauthorized(response)) {
    return redirect(LOGIN);
  }
  return response;
}

async function getWithData(path, data) {
  await fetch(resolveBackendPath(path + "?" + data), {
    method: "GET",
    credentials: "include",
  });

  if (isUnauthorized(response)) {
    return redirect(LOGIN);
  }
}

export async function postRegisterData(data) {
  const response = await fetch(resolveBackendPath(BACKEND_LOGGED), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw { status: response.status, message: response.statusText };
  }
}

export async function postNewCourt(data) {
  console.log(data);
  const response = await fetch(resolveBackendPath(BACKEND_ADD_COURT), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw { status: response.status, message: response.statusText };
  }
}

export async function postUpdateCourt(data) {
  console.log(data);
  const response = await fetch(resolveBackendPath("/courts/edit"), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw { status: response.status, message: response.statusText };
  }
}

export async function getOwnerProfileData(data) {
  const response = await fetch(resolveBackendPath("/owner?" + data), {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
}

export async function postUpdateOwnerProfileData(data) {
  console.log(data);
  const response = await fetch(resolveBackendPath("/owner/edit"), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw { status: response.status, message: response.statusText };
  }
}

export async function getAllCourts() {
  const response = await fetch(resolveBackendPath("/courts/all"), {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
}

export async function getCourtsForOwners(data) {
  const response = await fetch(resolveBackendPath("/courts?" + data), {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
}

export async function getCourtsForOwnersImageless(data) {
  const response = await fetch(
    resolveBackendPath("/courts/imageless?" + data),
    {
      method: "GET",
      credentials: "include",
    }
  );
  return await response.json();
}

export async function getCourtDetails(data) {
  const response = await fetch(resolveBackendPath("/courts/court?" + data), {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
}

export async function getAllUsers() {
  const response = await fetch(resolveBackendPath("/users/all?userId=1"), {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
}

export async function postAddUser(data) {
  console.log(data);
  const response = await fetch(resolveBackendPath("/users/add"), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw { status: response.status, message: response.statusText };
  }
}

export async function postUpdateUserData(data) {
  console.log(data);
  const response = await fetch(resolveBackendPath("/users/edit"), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw { status: response.status, message: response.statusText };
  }
}

export async function getTournamentsForOwners(data) {
  const response = await fetch(
    resolveBackendPath("/tournaments/owners?" + data),
    {
      method: "GET",
      credentials: "include",
    }
  );
  return await response.json();
}

export async function postNewTournament(data) {
  const response = await fetch(resolveBackendPath(BACKEND_ADD_TOURNAMENT), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw { status: response.status, message: response.statusText };
  }
}

export async function getAllTournaments() {
  const response = await fetch(resolveBackendPath("/tournaments/all"), {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
}

export async function getTournamentDetails(data) {
  const response = await fetch(resolveBackendPath("/tournaments/get?" + data), {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
}

export async function postCompleteTournament(data) {
  const response = await fetch(resolveBackendPath("/tournaments/finish"), {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw { status: response.status, message: response.statusText };
  }
}

export async function postNewTimeSlot(data) {
  try {
    const response = await fetch(resolveBackendPath("/slots/add"), {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
      body: JSON.stringify(data), // Convert data to JSON string
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Network Error:", error);
  }
}

export async function getTimeSlotsOwners(data) {
  const response = await fetch(
    resolveBackendPath("/slots/get/owners?" + data),
    {
      method: "GET",
      credentials: "include",
    }
  );
  return await response.json();
}

export async function getTimeSlotsPlayers(data) {
  const response = await fetch(
    resolveBackendPath("/slots/get/players?" + data),
    {
      method: "GET",
      credentials: "include",
    }
  );
  return await response.json();
}

export async function postDeleteTimeSlot(data) {
  try {
    const response = await fetch(resolveBackendPath("/slots/delete?" + data), {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Network Error:", error);
  }
}

export async function postBooTkimeSlot(data) {
  try {
    const response = await fetch(resolveBackendPath("/slots/book?" + data), {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Network Error:", error);
  }
}
