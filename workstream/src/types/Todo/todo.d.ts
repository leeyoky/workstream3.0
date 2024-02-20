export interface TodoState {
  cards: {
    boardId: number;
    boardTitle: string;
    cardItems: CardItem[];
  }[];
}

export interface CardItem {
  id: number;
  content: string;
  importance: string;
}

export interface CardList {
  id: number;
  isOpen: boolean;
}
