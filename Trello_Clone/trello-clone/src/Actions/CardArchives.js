import { ARCHIVE_POST } from "./ActionTypes";

export default function activeCard(cardId, listId) {
  return dispatch => {
    dispatch({ type: ARCHIVE_POST, payload: { cardId, listId } });
  };
}
