/**
 * menggabungkan thunk function users dan talks menjadi satu thunk function karena kedua data tersebut digunakan pada waktu yang sama, yaitu ketika homepage diakses
 */

import api from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveTalksActionCreator } from "../talks/action";

function asyncPopulateUsersandTalks() {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      const talks = await api.getAllTalks();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveTalksActionCreator(talks));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateUsersandTalks }; //kenapa ga default?
