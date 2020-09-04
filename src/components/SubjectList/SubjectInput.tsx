import React, { useState } from 'react';
import { createSubject } from '../../utils/SubjectApiUtil';

type SubjectInputProps = {
  onCreate: typeof createSubject
}
export function SubjectInput({ onCreate }: SubjectInputProps) {
  const [text, setText] = useState('');
  return <div>
    <input 
      value={text} 
      onChange={(e) => {
        setText(e.target.value);
      }} />
    <button 
      onClick={() => {
        if (text.trim() === '') {
          return;
        }

        onCreate({
          title: text
        }).then(() => {
            setText('');
          })
      }}>확인</button>
    </div>
}