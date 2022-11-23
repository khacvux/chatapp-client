import {
  ICreateGroup,
  IUpdateGroupDetails,
  IUpdateGroupOwner,
} from "../dtos/groupMessageDto";
import AXIOS from "./axiosClient";

const subdirectory = "/g";

export const getGroups = async ({ access_token }: { access_token: string }) => {
  try {
    return await AXIOS.get(`${subdirectory}/list`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const createGroup = async ({
  access_token,
  data,
}: {
  access_token: string;
  data: ICreateGroup;
}) => {
  try {
    return await AXIOS.post(`${subdirectory}/create`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const getGroup = async ({
  access_token,
  groupId,
}: {
  access_token: string;
  groupId: number;
}) => {
  try {
    return await AXIOS.get(`${subdirectory}/${groupId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const updateGroupOwner = async ({
  access_token,
  data,
  groupId,
}: {
  access_token: string;
  data: IUpdateGroupOwner;
  groupId: number;
}) => {
  try {
    return await AXIOS.post(`${subdirectory}/${groupId}`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const updateGroupDetails = async ({
  access_token,
  data,
  groupId,
}: {
  access_token: string;
  data: IUpdateGroupDetails;
  groupId: number;
}) => {
  try {
    return await AXIOS.post(`${subdirectory}/${groupId}`, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const getGroupMessages = async ({
  access_token,
  groupId,
}: {
  access_token: string;
  groupId: number;
}) => {
  try {
    return await AXIOS.get(`${subdirectory}/${groupId}/list`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    return error;
  }
};
