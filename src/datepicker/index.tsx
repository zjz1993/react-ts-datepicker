import * as React from "react";
import DatePickerHeader from "./header";
import DatePickerBody from "./body";
import DatePickerFooter from "./footer";
import "./style/style.css";

interface DatePickerProps {}

interface DatePickerState {
  currentDate: Array<number>;
  userSelectDate: Array<number>;
}

class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  constructor(props: DatePickerProps) {
    super(props);
    const newDate = new Date();
    this.state = {
      currentDate: [
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate()
      ],
      userSelectDate: [
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate()
      ]
    };
  }
  showPanel = () => {
    console.log(123);
  };
  onChange = (date: Array<number>): void => {
    this.setState({ userSelectDate: date });
    console.log(date);
  };
  resetDate = (): void => {
    this.setState({ userSelectDate: this.state.currentDate });
  };
  render() {
    const {
      userSelectDate: [userSelectYear, userSelectMonth, userSelectDay]
    } = this.state;
    const value: string = `${userSelectYear}-${userSelectMonth +
      1}-${userSelectDay}`;
    return (
      <div className="datepicker">
        <input
          className="datepicker-input"
          readOnly
          onClick={this.showPanel}
          value={value}
        />
        <div className="datepicker-panel">
          <DatePickerHeader
            handleDatePickerChange={this.onChange}
            currentDate={this.state.userSelectDate}
          />
          <DatePickerBody
            currentDate={this.state.userSelectDate}
            handleDatePickerChange={this.onChange}
          />
          <DatePickerFooter resetDate={this.resetDate} />
        </div>
      </div>
    );
  }
}
export default DatePicker;
