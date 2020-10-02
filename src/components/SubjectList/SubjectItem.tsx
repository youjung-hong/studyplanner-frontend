import React, { useState } from 'react';
import { Subject } from '../../models/Subject';
import { deleteSubject, updateSubject } from '../../utils/SubjectApiUtil';
import { Typography, Row, Col, Button, Input } from 'antd';

type SubjectItemProps = {
  subject: Subject,
  onDelete: typeof deleteSubject,
  onUpdate: typeof updateSubject
}

const { Title } = Typography;

export function SubjectItem({ subject, onDelete, onUpdate }: SubjectItemProps) {
  const [text, setText] = useState(subject.title);
  const [editing, setEditing] = useState(false);

  const onUpdateSubject = () => {
    onUpdate({
      ...subject,
      title: text
    })
      .then(() => {
        setEditing(false);
      })
  }

  if (editing) {
    return <Row>
      <Col span={2}><Title level={3}>{subject.id}.</Title></Col>
      <Col span={18}><Input
        value={text}
        onPressEnter={onUpdateSubject}
        onChange={(e) => {
          setText(e.target.value);
        }} /></Col>
      <Col span={2}>
        <Button 
          className="BtnUpdateSubject"
          block
          onClick={onUpdateSubject}>확인</Button>
      </Col>
      <Col span={2}>
        <Button 
          className="BtnCancelUpdate"
          block
          onClick={() => {
            setText(subject.title);
            setEditing(false);
          }}>취소</Button>
      </Col>
    </Row>
  }

  return (
    <Row className="SubjectItem">
      <Col span={2}><Title level={3}>{subject.id}.</Title></Col>
      <Col span={18}><Title level={3} className="SubjectTitle">{subject.title}</Title></Col>
      <Col span={2}><Button
        className="BtnSetEditMode"
        block
        onClick={() => {
          setEditing(true);
      }}>수정</Button>
      </Col>
      <Col span={2}>
      <Button 
        className="BtnDeleteSubject"
        block
        onClick={() => {
          onDelete(subject.id)
      }}>삭제</Button>
      </Col>
    </Row>
  )
}