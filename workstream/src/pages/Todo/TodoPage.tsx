import TodoBox from './TodoBox';

const TodoPage = () => {
  return (
    <div className="page-wrapper todo-wrapper">
      <TodoBox cardTitle="KM팀" />
      <TodoBox cardTitle="혁신경영본부" />
    </div>
  );
};

export default TodoPage;
