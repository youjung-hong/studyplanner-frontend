import React, { useState } from 'react';
import { Subject } from '../../models/Subject';
import { deleteSubject, updateSubject } from '../../utils/SubjectApiUtil';

type SubjectItemProps = {
  subject: Subject,
  onDelete: typeof deleteSubject,
  onUpdate: typeof updateSubject
}

export function SubjectItem({ subject, onDelete, onUpdate }: SubjectItemProps) {
  const [text, setText] = useState(subject.title);
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <div>
      {subject.id} : <input 
        value={text} 
        onChange={(e) => {
          setText(e.target.value);
        }} />
      <button 
        onClick={() => {
          onUpdate({
            ...subject,
            title: text
          })
            .then(() => {
              setEditing(false);
            })
        }}>확인</button>
        <button 
          onClick={() => {
            setText(subject.title);
            setEditing(false);
          }}>취소</button>
    </div>
  }

  return (
    <div>
      {subject.id} : {subject.title} 
      <button 
        onClick={() => {
          setEditing(true);
      }}>수정</button>
      <button 
        onClick={() => {
          onDelete(subject.id)
      }}>삭제</button>
    </div>
  )
}