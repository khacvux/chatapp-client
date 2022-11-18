import AXIOS from "./axiosClient";

const subdirectory = "freq";

export const getFriendRequest = async (access_token: string) => {
  return await AXIOS.get(`${subdirectory}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const createFriendRequest = async ({
  access_token,
  id,
}: {
  access_token: string;
  id: number;
}) => {
  return await AXIOS.get(`${subdirectory}/${id}/create`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const acceptFriendRequest = async ({
  access_token,
  id,
}: {
  access_token: string;
  id: number;
}) => {
  return await AXIOS.get(`${subdirectory}/${id}/accept`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const cancelFriendRequest = async ({
  access_token,
  id,
}: {
  access_token: string;
  id: number;
}) => {
  return await AXIOS.delete(`${subdirectory}/${id}/cancel`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const rejectFriendRequest = async ({
  access_token,
  id,
}: {
  access_token: string;
  id: number;
}) => {
  return await AXIOS.delete(`${subdirectory}/${id}/reject`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
