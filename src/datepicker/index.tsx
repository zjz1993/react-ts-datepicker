import * as React from "react";
import DatePickerHeader from "./header";
import DatePickerBody from "./body";
import DatePickerFooter from "./footer";
import "./style/style.css";

interface DatePickerProps {}

interface DatePickerState {
  currentDate: Array<number>;
  userSelectDate: Array<number>;
  panelVisible: boolean;
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
      ],
      panelVisible: false
    };
  }
  togglePanel = () => {
    const { panelVisible } = this.state;
    this.setState({ panelVisible: !panelVisible });
  };
  onChange = (date: Array<number>,type: string): void => {
    this.setState({ userSelectDate: date });
    if (type === "body") {
      this.togglePanel();
    }
    console.log(date);
  };
  resetDate = (): void => {
    this.setState({ userSelectDate: this.state.currentDate });
  };
  render() {
    const {
      panelVisible,
      userSelectDate: [userSelectYear, userSelectMonth, userSelectDay]
    } = this.state;
    const value: string = `${userSelectYear}-${userSelectMonth +
      1}-${userSelectDay}`;
      const panelCls = panelVisible
      ? "datepicker-panel"
      : "datepicker-panel hidden";
    return (
      <div className="datepicker">
        <input
          className="datepicker-input"
          readOnly
          onClick={this.togglePanel}
          value={value}
        />
        <div className={panelCls}>
          <DatePickerHeader
            handleDatePickerChange={date => this.onChange(date, "header")}
            currentDate={this.state.userSelectDate}
          />
          <DatePickerBody
            currentDate={this.state.userSelectDate}
            handleDatePickerChange={date => this.onChange(date, "body")}
          />
          <DatePickerFooter resetDate={this.resetDate} />
        </div>
      </div>
    );
  }
}
export default DatePicker;
