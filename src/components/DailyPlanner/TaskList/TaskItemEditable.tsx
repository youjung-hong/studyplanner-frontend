import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskFormData } from '../../../models/Task';
import { Subject } from '../../../models/Subject';

type SubjectSelectorProps = {
  subjects: Subject[],
  selectedId: number
  onChange: (subject: number) => void
}

function SubjectSelector({ subjects, selectedId, onChange }: SubjectSelectorProps) {
  return <select 
    name="subject"
    onChange={(e) => {
      onChange(subjects[e.target.selectedIndex].id)
    }}
    value={selectedId}
    disabled={!subjects.length}
  >
    {subjects.map(subject => {
      return <option key={subject.id} value={subject.id}>[{subject.id}{subject.id === selectedId ? '*' : ''}]{subject.title}</option> 
    })}
  </select>
}

type TaskItemEditableProps = {
  itemKey: string | number,
  task: Task | undefined,
  subjects: Subject[],
  onCreate: (data: { subjectId: number, title: string, status: TaskStatus }) => void,
  onUpdate: (taskId:number, data: TaskFormData) => void,
  onCancel: () => void
}

export function TaskItemEditable({ itemKey, task, subjects, onCreate, onUpdate, onCancel }: TaskItemEditableProps) {
  const [state, setState] = useState({
    subjectId: task ? task.subjectId : subjects.length ? subjects[0].id : 0,
    title: task ? task.title : '',
    status: task ? task.status : TaskStatus.NOT_STARTED,
  });
  
  useEffect(() => {
    if (!task && subjects.length) {
      setState({
        ...state,
        subjectId: subjects[0].id
      })
    }
  }, [subjects]);

  return (<li key={itemKey}>
    <span>
      <SubjectSelector
        subjects={subjects} 
        selectedId={state.subjectId} 
        onChange={(subjectId) => {
          setState({...state, subjectId})
        }}
      />
    </span>
    <span>
      <input 
        value={state.title}
        disabled={!subjects.length}
        onChange={(e) => {
          setState({...state, title: e.target.value});
        }}
      />
    </span>
    <span>
      <input 
        type="radio" 
        disabled={!subjects.length} 
        name={`${itemKey}`}
        value={TaskStatus.NOT_STARTED} 
        checked={state.status === TaskStatus.NOT_STARTED}
        onChange={(e) => {
          setState({...state, status: TaskStatus.NOT_STARTED})
        }}
      ></input>시작전
      <input 
        type="radio" 
        disabled={!subjects.length} 
        name={`${itemKey}`}
        value={TaskStatus.STARTED} 
        checked={state.status === TaskStatus.STARTED}
        onChange={(e) => {
          setState({...state, status: TaskStatus.STARTED})
        }}
      ></input>시작
      <input 
        type="radio" 
        disabled={!subjects.length} 
        name={`status-${itemKey}`}
        value={TaskStatus.FINISHED} 
        checked={state.status === TaskStatus.FINISHED}
        onChange={(e) => {
          setState({...state, status: TaskStatus.FINISHED})
        }}
      ></input>완료
      <input 
        type="radio" 
        disabled={!subjects.length} 
        name={`status-${itemKey}`}
        value={TaskStatus.PUT_OFF} 
        checked={state.status === TaskStatus.PUT_OFF}
        onChange={(e) => {
          setState({...state, status: TaskStatus.PUT_OFF})
        }}
      ></input>미룸
    </span>
    <button
      disabled={!subjects.length}
      onClick={() => {
      if (!state.title) {
        alert('할 일을 입력해주세요.');
        return;
      }

      if (!state.subjectId) {
        alert('과목을 선택해주세요.');
        return;
      }

      task ? onUpdate(task.id, {
        ...state,
        date: task.date
      }) : onCreate(state)
    }}>저장</button>
    {task && <button onClick={onCancel}>취소</button>}
  </li>)
}