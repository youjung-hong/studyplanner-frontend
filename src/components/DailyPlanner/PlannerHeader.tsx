import React from 'react';
import moment from 'moment';

type PlannerHeaderProps = {
  date: Date,
  onChangeDate: (date: Date) => void,
}

export function PlannerHeader({ date, onChangeDate }: PlannerHeaderProps) {
  console.log(`[PlannerHeader] props.date: ${date}`);

  return (<div className="PlannerHeader">
    <h3
      className="previousDay"
      onClick={() => {
      onChangeDate(moment(date).subtract(1, 'day').startOf('day').toDate())
    }}>&lt;&nbsp;이전날</h3>
    <h2 className="theDay">{moment(date).format('YY.MM.DD')}</h2>
    <h3
      className="nextDay"
      onClick={() => {
        onChangeDate(moment(date).add(1, 'day').startOf('day').toDate())
      }}
    >다음날&nbsp;&gt;</h3>
  </div>)
} 