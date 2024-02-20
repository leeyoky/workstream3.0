import { useState } from 'react';
import BoardTitle from '../../Layout/BoardLayout/BoardTitle';
import TodoBox from './TodoBox';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../../store/Todo/todo-slice';
import { RootState } from '../../store';
import { CardList } from '../../types/Todo/todo';

const TodoPage = () => {
  const [createCardLists, setCreateCardLists] = useState<CardList[]>([]);
  const cardListCnt = useSelector((state: RootState) => state.todo.cards);
  const dispatch = useDispatch();
  const title = 'Todo';

  const addCardList = () => {
    setCreateCardLists(prevLists => [...prevLists, { id: cardListCnt.length + 1, isOpen: true }]);
    dispatch(todoActions.addCardList({ id: cardListCnt.length + 1 }));
    //dispatch(todoActions.removeCardLists());
  };

  return (
    <div className="page-wrapper todo-wrapper">
      <BoardTitle title={title} />

      <div className="index-box">
        {createCardLists.map(
          cardList =>
            cardList.isOpen && (
              <TodoBox
                key={cardList.id}
                onCancel={() =>
                  setCreateCardLists(prevLists =>
                    prevLists.map(list =>
                      list.id === cardList.id ? { ...list, isOpen: false } : list,
                    ),
                  )
                }
              />
            ),
        )}
        <div className="add-card _list" onClick={addCardList}>
          <i className="fa-solid fa-plus"></i>
          <span>Add New Card List</span>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
