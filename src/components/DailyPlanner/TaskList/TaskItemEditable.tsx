import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskFormData } from '../../../models/Task';
import { Subject } from '../../../models/Subject';
import { Select, Input, Button, Col, Row } from 'antd';

const { Option } = Select

type SubjectSelectorProps = {
  subjects: Subject[],
  selectedId: number
  onChange: (subject: number) => void
}

function SubjectSelector({ subjects, selectedId, onChange }: SubjectSelectorProps) {
  return <Select 
    onChange={(value) => {
      onChange(subjects[value].id)
    }}
    value={selectedId}
    disabled={!subjects.length}
  >
    {subjects.map(subject => {
      return <Option key={subject.id} value={subject.id}>{subject.title}</Option> 
    })}
  </Select>
}

type TaskItemEditableProps = {
  itemKey: string | number,
  task: Task | TaskFormData,
  subjects: Subject[],
  onCreate: (data: { subjectId: number, title: string, status: TaskStatus }) => void,
  onUpdate: (taskId:number, data: TaskFormData) => void,
  onCancel: () => void,
}

export function TaskItemEditable({ itemKey, task, subjects, onCreate, onUpdate, onCancel }: TaskItemEditableProps) {
  const [state, setState] = useState({
    subjectId: task.subjectId,
    title: task.title,
    status: task.status,
  });
  
  useEffect(() => {
    setState({
      subjectId: task.subjectId,
      title: task.title,
      status: task.status,
    })
  }, [task]);

  return (<li>
    <Row>
    <Col span={5}>
      <SubjectSelector
        subjects={subjects} 
        selectedId={state.subjectId} 
        onChange={(subjectId) => {
          setState({...state, subjectId})
        }}
      />
    </Col>
    <Col span={10}>
      <Input 
        value={state.title}
        disabled={!subjects.length}
        onChange={(e) => {
          setState({...state, title: e.target.value});
        }}
      />
    </Col>
    <Col span={5}>
      <Select 
        onChange={(value) => {
          setState({...state, status: value})
        }}
        value={state.status}
        disabled={!subjects.length}
      >
        <Option value={TaskStatus.NOT_STARTED}>시작전</Option>
        <Option value={TaskStatus.STARTED}>시작</Option>
        <Option value={TaskStatus.FINISHED}>끝</Option>
        <Option value={TaskStatus.PUT_OFF}>미룸</Option>
      </Select>
    </Col>
    <Col span={3}>
    <Button
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

      'id' in task ? onUpdate(task.id, {
        ...state,
        date: task.date
      }) : onCreate(state)
    }}>저장</Button>
    {'id' in Task && <Button onClick={onCancel}>취소</Button>}
    </Col>
    </Row>
  </li>)
}