import { useState } from 'react';
import CreateTodoCardItem from './CreateTodoCardItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { todoActions } from '../../store/Todo/todo-slice';
import { useDispatch } from 'react-redux';

interface TodoBoxProps {
  onCancel: () => void;
}
const TodoBox: React.FC<TodoBoxProps> = ({ onCancel }) => {
  const [createItem, setCreateItem] = useState(false);
  const [cardListTitle, setCardListTitle] = useState('');
  const cards = useSelector((state: RootState) => state.todo.cards);
  const dispatch = useDispatch();

  /*   const getBadgeColorClass = (importance: string) => {
    if (importance === '긴급') {
      return 'badge-denger';
    } else if (importance === '보통') {
      return 'badge-success';
    } else if (importance === '중요') {
      return 'badge-info';
    }
  }; */

  const addNewCard = () => {
    setCreateItem(prevCreateItem => !prevCreateItem);
  };

  const changeCardListTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardListTitle(event.target.value);
  };

  const createCard = () => {
    if (!cardListTitle.trim()) {
      onCancel();
      if (cards.length > 0) {
        const lastCardId = cards[cards.length - 1].boardId;
        dispatch(todoActions.removeCardList(lastCardId));
      }
    } else {
      dispatch(
        todoActions.addCardList({
          id: cards.length + 1,
        }),
      );
      console.log('취소');
    }
  };

  return (
    <div className="card-containner" draggable={true} onBlur={createCard}>
      <div className="card-title">
        <input
          onChange={changeCardListTitle}
          value={cardListTitle}
          placeholder="카드의 제목을 입력하세요"
        />
      </div>
      {/* {cards.map(card => (
        <div className="_card" key={card.boardId}>
          {card.cardItems.map(item => (
            <div key={item.id}>
              <span>
                <div className={`todo-badge ${getBadgeColorClass(item.importance)}`}></div>
                <i className="fa-solid fa-ellipsis"></i>
              </span>
              <div className="todo-content">{item.content}</div>
              <div className="profile-box">
                <img src={test1} alt="" />
              </div>
            </div>
          ))}
        </div>
      ))} */}
      {createItem && <CreateTodoCardItem onCancel={() => setCreateItem(false)} />}
      <div className="add-card _item" onClick={addNewCard}>
        <i className="fa-solid fa-plus"></i>
        <span>Add card</span>
      </div>
    </div>
  );
};

export default TodoBox;
