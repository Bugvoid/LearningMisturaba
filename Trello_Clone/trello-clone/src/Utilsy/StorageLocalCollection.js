import find from "lodash/find";

export const loadState = () => {
  try {
    const serializedCollectionBoardState = localStorage.getItem(
      "boardsColletion"
    );
    if (serializedCollectionBoardState === null) {
      return undefined;
    }
    return JSON.parse(serializedCollectionBoardState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = boards => {
  try {
    // save Colletion into activeBoardData
    boards.boardsColletion.map(board => {
      if (board.id === boards.activeBoard.id) {
        board.data = boards.activeBoardData.listItems;
      }
      const serializedCollectionBoardState = JSON.stringify(boards);
      localStorage.setItem("boardsCollection", serializedCollectionBoardState);
    });
  } catch (error) {
    new Error(error);
  }
};
