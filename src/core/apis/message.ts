import AXIOS from "./axiosClient";

const subdirectory = "/chat";

export const getchats = async ({
  access_token,
  receiverId,
}: {
  access_token: string;
  receiverId: number;
}) => {
  const body = {
    receiverId,
  };
  try {
    const res = await AXIOS.post(`${subdirectory}/getchats`, body, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
