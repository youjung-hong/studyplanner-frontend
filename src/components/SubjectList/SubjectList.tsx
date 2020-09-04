import React from 'react';
import { SubjectItem } from './SubjectItem';
import { Subject } from '../../models/Subject';
import { deleteSubject, updateSubject } from '../../utils/SubjectApiUtil';

type SubjectListProps = {
  subjects: Subject[],
  onDelete: typeof deleteSubject,
  onUpdate: typeof updateSubject
}

export function SubjectList({ subjects, onDelete, onUpdate }: SubjectListProps) {
  return <ul>{subjects.map(subject => 
    <SubjectItem key={subject.id} subject={subject} onDelete={onDelete} onUpdate={onUpdate} />
  )}</ul>
}
