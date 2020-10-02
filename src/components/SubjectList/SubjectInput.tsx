import React, { useState } from 'react';
import { createSubject } from '../../utils/SubjectApiUtil';
import { Row, Col, Input, Button, Typography } from 'antd';

const { Title } = Typography;

type SubjectInputProps = {
  onCreate: typeof createSubject
}
export function SubjectInput({ onCreate }: SubjectInputProps) {
  const [text, setText] = useState('');

  const onCreateSubject = () => {
    if (text.trim() === '') {
      return;
    }

    onCreate({
      title: text
    }).then(() => {
        setText('');
      })
  };

  return <div className="SubjectInput">
    <Row>
    <Col span={20}>
      <Input 
        value={text} 
        onChange={(e) => {
          setText(e.target.value);
        }}
        onPressEnter={onCreateSubject}
        placeholder="과목명을 입력해주세요."
      />
    </Col>
    <Col span={4}>
      <Button
        className="BtnCreateSubject"
        type="primary"
        block
        onClick={onCreateSubject}>추가</Button>
    </Col>
  </Row>
  </div>
}