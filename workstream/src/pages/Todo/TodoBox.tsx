import test1 from '../../assets/img/test1.jpg';
import { data } from './TodoData';

interface TodoBoxProps {
  cardTitle: string;
}

const TodoBox: React.FC<TodoBoxProps> = ({ cardTitle }) => {
  const getBadgeColorClass = (importance: string) => {
    if (importance === '긴급') {
      return 'badge-denger';
    } else if (importance === '보통') {
      return 'badge-success';
    } else if (importance === '중요') {
      return 'badge-info';
    }
  };

  return (
    <div className="card-containner">
      <div className="card-title">
        <h2>{cardTitle}</h2>
        <i className="fa-solid fa-ellipsis"></i>
      </div>
      {data.map(item => (
        <div className="_card" key={item.id}>
          <div className={`todo-badge ${getBadgeColorClass(item.importance)}`}>
            {item.importance}
          </div>
          <div className="todo-content">{item.content}</div>
          <div className="profile-box" title={item.regUsr}>
            <img src={test1} alt="" />
          </div>
        </div>
      ))}
      <div className="add-card">
        <i className="fa-solid fa-plus"></i>
        <span>Add card</span>
      </div>
    </div>
  );
};

export default TodoBox;
