import * as React from "react";
import "./style/header.css";

interface HeaderProps {
  currentDate: Array<number>;
  handleDatePickerChange: (date: Array<number>) => void;
}
interface HeaderState {}

class DatePickerHeader extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {};
  }
  subtraction = (type: string): void => {
    const {
      currentDate: [currentYear, currentMonth, currentDay]
    } = this.props;
    if (type === "year") {
      const userSelectYear = currentYear - 1;
      this.props.handleDatePickerChange([
        userSelectYear,
        currentMonth,
        currentDay
      ]);
    } else {
      const userSelectMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      let userSelectYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      this.props.handleDatePickerChange([
        userSelectYear,
        userSelectMonth,
        currentDay
      ]);
    }
  };
  add = (type: string): void => {
    const {
      currentDate: [currentYear, currentMonth, currentDay]
    } = this.props;
    if (type === "year") {
      const userSelectYear = currentYear + 1;
      this.props.handleDatePickerChange([
        userSelectYear,
        currentMonth,
        currentDay
      ]);
    } else {
      const userSelectMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      let userSelectYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      this.props.handleDatePickerChange([
        userSelectYear,
        userSelectMonth,
        currentDay
      ]);
    }
  };
  render() {
    const {
      currentDate: [currentYear, currentMonth, currentDay]
    } = this.props;
    return (
      <div className="datepicker-header">
        <span
          className="year-pre-btn btn"
          onClick={() => this.subtraction("year")}
        />
        <span
          className="month-pre-btn btn"
          onClick={() => this.subtraction("month")}
        />
        <span className="select">
          <span className="year-select">{currentYear}年</span>
          <span className="month-select">{currentMonth + 1}月</span>
        </span>
        <span className="year-next-btn btn" onClick={() => this.add("year")} />
        <span
          className="month-next-btn btn"
          onClick={() => this.add("month")}
        />
      </div>
    );
  }
}
export default DatePickerHeader;
