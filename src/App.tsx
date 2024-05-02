import React, { useState } from 'react';
import './App.css';

function App() {
  // 상태를 관리할 useState 훅을 사용
  const [scheduleList, setScheduleList] = useState([]); // 일정 목록을 저장하는 상태
  const [title, setTitle] = useState(''); // 입력된 제목을 저장하는 상태
  const [content, setContent] = useState(''); // 입력된 내용을 저장하는 상태
  const [priority, setPriority] = useState(1); // 입력된 중요도를 저장하는 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장하는 상태
  const [filterPriority, setFilterPriority] = useState(null); // 필터링할 중요도를 저장하는 상태

  // 일정을 추가하는 함수
  const addSchedule = () => {
    // 제목과 내용이 비어있지 않은 경우에만 일정을 추가
    if (title.trim() !== '' && content.trim() !== '') {
      const newSchedule = {
        title,
        content,
        priority,
        time: new Date().toLocaleString() // 현재 시간을 등록
      };
      setScheduleList([...scheduleList, newSchedule]); // 새로운 일정을 추가
      setTitle(''); // 입력 필드를 초기화
      setContent('');
      setPriority(1);
    }
  };

  // 일정을 삭제하는 함수
  const deleteSchedule = (index) => {
    const newList = [...scheduleList]; // 기존의 일정 목록을 복사
    newList.splice(index, 1); // 해당 인덱스의 일정을 삭제
    setScheduleList(newList); // 새로운 일정 목록으로 업데이트
  };

  // 필터된 일정 목록을 반환하는 함수
  const filteredList = scheduleList
    .filter(schedule =>
      schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) || // 제목으로 검색
      schedule.content.toLowerCase().includes(searchTerm.toLowerCase()) // 내용으로 검색
    )
    .filter(schedule =>
      filterPriority ? schedule.priority === filterPriority : true // 중요도로 필터링
    )
    .sort((a, b) => new Date(b.time) - new Date(a.time)); // 시간순으로 정렬

  return (
    <div className="app">
      <h1>일정 메모 시스템</h1>
      {/* 일정 입력 폼 */}
      <div className="input-form">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="number"
          placeholder="중요도(1~5)"
          min={1}
          max={5}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <button onClick={addSchedule}>일정 추가</button>
      </div>
      {/* 검색 및 필터링 영역 */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(parseInt(e.target.value) || null)}
        >
          <option value="">모든 중요도</option>
          {[1, 2, 3, 4, 5].map(priority => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>
      </div>
      {/* 일정 목록 */}
      <div className="schedule-list">
        {filteredList.map((schedule, index) => (
          <div className="schedule-item" key={index}>
            <h2>{schedule.title}</h2>
            <p>{schedule.content}</p>
            <p>중요도: {schedule.priority}</p>
            <p>등록 시간: {schedule.time}</p>
            <button onClick={() => deleteSchedule(index)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
