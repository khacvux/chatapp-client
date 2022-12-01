import AXIOS from "./axiosClient";

const subdirectory = "/user";

export const getPeerId = async (access_token: string, userid: number) => {
  return await AXIOS.get(`${subdirectory}/${userid}/peerid`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const updatePeerId = async (
  access_token: string,
  peerId: string
) => {
  return await AXIOS.post(
    `${subdirectory}/peerid/update`,
    { peerId },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const deletePeerId = async (access_token: string) => {
  return await AXIOS.delete(`${subdirectory}/peerid/delete`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
