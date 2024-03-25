import { useState } from 'react';

export const useSortColumn = (
  defaultSortColumn: string, // 기본 정렬 컬럼
  defaultSortDirection: 'asc' | 'desc' | '',
  columnSortAttributes: Record<string, string>,
) => {
  const [sortValue, setSortValue] = useState<string>(
    `${defaultSortColumn},${defaultSortDirection}`,
  );
  const [sortDirections, setSortDirections] = useState<Record<string, 'asc' | 'desc' | ''>>(
    Object.keys(columnSortAttributes).reduce(
      (acc, column) => {
        acc[column] = column === defaultSortColumn ? 'desc' : '';
        return acc;
      },
      {} as Record<string, 'asc' | 'desc' | ''>,
    ),
  );
  const [currentSortColumn, setCurrentSortColumn] = useState<string | null>(null);

  const toggleSortDirection = (column: string) => {
    setSortDirections(prevSortDirections => {
      const newSortDirections = { ...prevSortDirections };

      // 현재 정렬 중인 컬럼 이외의 나머지 컬럼을 모두 초기값으로 리셋
      Object.keys(newSortDirections).forEach(key => {
        if (key !== column) {
          newSortDirections[key] = '';
        }
      });

      // 현재 컬럼 토글
      newSortDirections[column] =
        newSortDirections[column] === ''
          ? 'asc'
          : newSortDirections[column] === 'asc'
          ? 'desc'
          : '';

      // Set currentSortColumn state
      setCurrentSortColumn(column);

      return newSortDirections;
    });
  };

  /* 정렬 함수 */
  const sortHandler = (column: string) => {
    // 현재 정렬 중인 열이 다른 열을 클릭한 경우, 초기값을 설정
    if (currentSortColumn && currentSortColumn !== column) {
      setSortDirections(prevSortDirections => ({
        ...prevSortDirections,
        [column]: '',
      }));

      setSortValue(`${columnSortAttributes[column]},desc`);
      toggleSortDirection(column);
    } else {
      let newSortValue = '';

      if (sortDirections[column] === 'desc') {
        newSortValue = `${defaultSortColumn},desc`;
      } else {
        // 컬럼별 정렬 방향 설정
        const sortOrder =
          sortDirections[column] === '' ? 'asc' : sortDirections[column] === 'asc' ? 'desc' : '';

        // 선택된 컬럼에 따라 새로운 정렬 방향 설정
        newSortValue = `${columnSortAttributes[column]},${sortOrder}`;
      }

      setSortValue(newSortValue);
      toggleSortDirection(column);
    }
  };
  return {
    sortValue,
    sortDirections,
    currentSortColumn,
    toggleSortDirection,
    sortHandler,
  };
};

export default useSortColumn;
