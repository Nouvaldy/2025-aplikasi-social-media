import api from "../../utils/api";

const ActionType = {
  RECEIVE_TALKS: "RECEIVE_TALKS",
  ADD_TALK: "ADD_TALK",
  TOGGLE_LIKE_TALK: "TOGGLE_LIKE_TALK",
};

function receiveTalksActionCreator(talks) {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
}

function addTalksActionCreator(talk) {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    },
  };
}

function toggleLikeTalkActionCreator({ talkId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_TALK,
    payload: {
      talkId,
      userId,
    },
  };
}

//fungsi thunk
function asyncAddTalk({ text, replyTo = "" }) {
  return async (dispatch) => {
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispatch(addTalksActionCreator(talk));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleLikeTalk({ talkId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id })); //teknik optimistically apply action

    try {
      await api.toggleLikeTalk(talkId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeTalkActionCreator({ talkId, userId: authUser.id })); //teknik optimistically apply action
    }
  };
}

export {
  ActionType,
  receiveTalksActionCreator,
  addTalksActionCreator,
  toggleLikeTalkActionCreator,
  asyncAddTalk,
  asyncToggleLikeTalk,
};
