import React from 'react';
import moment from 'moment';

type PlannerHeaderProps = {
  date: Date,
  onChangeDate: (date: Date) => void,
}

export function PlannerHeader({ date, onChangeDate }: PlannerHeaderProps) {
  console.log(`[PlannerHeader] props.date: ${date}`);

  return (<div>
    <span 
      onClick={() => {
      onChangeDate(moment(date).subtract(1, 'day').startOf('day').toDate())
    }}>이전날</span>
      {moment(date).format('YY.MM.DD')}
    <span
      onClick={() => {
        onChangeDate(moment(date).add(1, 'day').startOf('day').toDate())
      }}
    >다음날</span>
  </div>)
} 