import AXIOS from "./axiosClient";

const subdirectory = "f";

export const getFriends = async (access_token: string) => {
  return await AXIOS.get(`${subdirectory}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const deleteFriend = async ({
  access_token,
  id,
}: {
  access_token: string;
  id: number;
}) => {
  return await AXIOS.delete(`${subdirectory}/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const searchLikeUsername = async ({
  querry,
  access_token,
}: {
  querry: string;
  access_token: string;
}) => {
  return await AXIOS.get(`${subdirectory}/search/${querry}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
