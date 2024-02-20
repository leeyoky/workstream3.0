import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardItem, TodoState } from '../../types/Todo/todo';

const initialState: TodoState = {
  cards: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addCardList(state, action: PayloadAction<{ id: number }>) {
      const newCardList = {
        boardId: action.payload.id,
        boardTitle: '',
        cardItems: [],
      };
      state.cards.push(newCardList);
    },
    updateCardListTitle(state, action: PayloadAction<string>) {
      if (state.cards.length > 0) {
        state.cards[state.cards.length - 1].boardTitle = action.payload;
      }
    },
    removeCardList(state, action: PayloadAction<number>) {
      const cardIdToRemove = action.payload;
      state.cards = state.cards.filter(card => card.boardId !== cardIdToRemove);
    },
    removeCardLists(state) {
      state.cards = [];
    },
    addCardItem(
      state,
      action: PayloadAction<{ boardId: number; content: string; importance: string }>,
    ) {
      const { boardId, content, importance } = action.payload;
      const cardIndex = state.cards.findIndex(card => card.boardId === boardId);

      if (cardIndex !== -1) {
        const newCardItem: CardItem = {
          id: state.cards[cardIndex].cardItems.length + 1,
          content,
          importance,
        };
        state.cards[cardIndex].cardItems.push(newCardItem);
      }
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;
