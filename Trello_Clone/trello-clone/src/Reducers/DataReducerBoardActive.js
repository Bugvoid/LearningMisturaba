import { combineReducers } from "redux";

import {
  SUBMIT_LIST,
  SUBMIT_NEW_CARD,
  HANDLE_DROP,
  ARCHIVE_POST,
  SELECT_ACTIVE_BOARD
} from "./../Actions/ActionTypes";

import uniqueId from "lodash/uniqueId";

const ListReducer = (state = {}, action) => {
  const listId = uniqueId("list_");

  switch (action.type) {
    case SELECT_ACTIVE_BOARD:
      return action.payload.data || [];

    case SUBMIT_LIST:
      return {
        ...state,
        [listId]: {
          //list of id unique
          name: action.payload, // list of name
          id: listId, // id list
          cards: [] // card IDs go inside here
        }
      };
    case SUBMIT_NEW_CARD: {
      const { listId, cardName, cardId } = action.payload;
      const currentList = state[listId];
      currentList.cards.push({
        name: cardName,
        cardId,
        listId,
        isArchived: false
      });
      return {
        ...state,
        [listId]: currentList
      };
    }
    case HANDLE_DROP: {
      const { cardId, cardName, listId, newlistId } = action.payload;
      const currentList = state[newListId];
      currentList.cards.push({
        name: cardName,
        cardId,
        listId: newListId
      });
      const removeCard = state[listId].cards.findIndex(
        card => card.cardId === cardId
      );
      const oldList = state[listId].card.splice(removeCard, 1);

      return {
        ...state,
        [newListId]: currentList
      };
    }
    case ARCHIVE_POST: {
      const { cardId, listId } = action.payload;
      const currentList = state[listId];
      const findcard = currentList.cards.find(card => card.cardId === cardId);

      if (findcard.isArchived === false) {
        findcard.isArchived = true;
      } else {
        findcard.isArchived = false;
      }
      return {
        ...state,
        [listId]: currentList
      };
    }
    default:
      return state;
  }
};

const ReducerBoardActive = combineReducers({
  listItem: ListReducer
});

export default ActiveBoardReducer;
