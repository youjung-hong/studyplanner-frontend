import React from 'react';
import OneTimetable, { TaskItem as TimetableTaskItem } from 'one-timetable'
import TaskItem from '../../models/TaskItem';

interface TimetableProps {
  items: TaskItem[]
}

class Timetable extends React.Component<TimetableProps> {
  timetableRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    if (this.timetableRef.current) {
      this.timetableRef.current.id = 'timetable-' + Date.now()
      new OneTimetable(this.timetableRef.current.id, this.props.items.map(item => TimetableTaskItem.clone(item)))
    }
  }

  componentDidUpdate() {
    if (this.timetableRef.current) {
      this.timetableRef.current.innerHTML = ''
      new OneTimetable(this.timetableRef.current.id, this.props.items.map(item => TimetableTaskItem.clone(item)))
    }
  }

  render() {
    return <div className="Timetable" ref={this.timetableRef}></div>
  }
}

export default Timetable;