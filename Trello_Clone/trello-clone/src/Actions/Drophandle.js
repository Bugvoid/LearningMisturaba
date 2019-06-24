import { HANDLE_DROP } from "./ActionTypes";

export default function handledrop(cardName, cardId, listId, newListId) {
  return dispatch => {
    dispatch({
      type: HANDLE_DROP,
      payload: { cardName, cardId, listId, newListId }
    });
  };
}
