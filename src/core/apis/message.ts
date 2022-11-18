import AXIOS from "./axiosClient";

const subdirectory = "/chat";

export const getchats = async ({
  access_token,
  receiverId,
}: {
  access_token: string;
  receiverId: number;
}) => {
  try {
    const res = await AXIOS.get(`${subdirectory}/${receiverId}/list`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
