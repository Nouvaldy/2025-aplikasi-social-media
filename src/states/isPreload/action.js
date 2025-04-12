import api from "../../utils/api";
import { setAuthUserActionCreator } from "../authUser/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

//fungsi thunk
function asynchPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      //preload process
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      //fallback process
      dispatch(setAuthUserActionCreator(null));
    } finally {
      //end preload process
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

export { ActionType, setIsPreloadActionCreator, asynchPreloadProcess };
