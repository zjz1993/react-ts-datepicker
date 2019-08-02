import * as React from "react";
import "./style/body.css";

const thirtyOneDaysMonth: Array<number> = [0, 2, 4, 6, 7, 9, 11];

interface BodyProps {
  currentDate: Array<number>;
  handleDatePickerChange: (date: Array<number>) => void;
}

interface BodyState {
  userSelectDay: number;
}

class DatePickerBody extends React.Component<BodyProps, BodyState> {
  constructor(props: BodyProps) {
    super(props);
    this.state = {
      userSelectDay: props.currentDate[2]
    };
  }
  static getDerivedStateFromProps(nextProps: BodyProps, preState: BodyState) {
    const userSelectDay = nextProps.currentDate[2];
    if (userSelectDay !== preState.userSelectDay) {
      return {
        userSelectDay
      };
    } else {
      return null;
    }
  }
  createNumberSequence = (
    array: Array<any>,
    startNum: number,
    endNum: number
  ) => {
    for (let i = startNum; i <= endNum; i++) {
      array.push(i);
    }
    return array;
  };
  isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  // 看一下传进来的月份有多少天
  judgeLastDay = (month: number, currentYear: number): number => {
    if (thirtyOneDaysMonth.includes(month)) {
      return 31;
    } else if (month === 1) {
      if (this.isLeapYear(currentYear)) {
        return 29;
      } else {
        return 28;
      }
    } else {
      return 30;
    }
  };
  createPreMonthCell = (
    containerArray: Array<React.ReactNode>,
    contentArray: Array<number>,
    endDay: number
  ): Array<React.ReactNode> => {
    for (let i = 1; i <= endDay; i++) {
      containerArray.push(
        <div className="table-body-item last-month">{contentArray[i - 1]}</div>
      );
    }
    return containerArray;
  };
  createCurrentMonthCell = (
    containerArray: Array<React.ReactNode>,
    contentArray: Array<number>,
    lastDay: number
  ) => {
    const {
      currentDate: [currentYear, currentMonth, currentDay]
    } = this.props;
    const { userSelectDay } = this.state;
    for (let i = 1; i <= lastDay; i++) {
      const dayValue = contentArray[i];
      let cls = null;
      if (dayValue === userSelectDay) {
        cls = "table-body-item selected";
      } else {
        cls = "table-body-item";
      }
      containerArray.push(<div className={cls}>{contentArray[i]}</div>);
    }
    return containerArray;
  };
  createNextMonthCell = (
    containerArray: Array<React.ReactNode>,
    contentArray: Array<number>,
    lastDay: number
  ) => {
    for (let i = 1; i <= lastDay; i++) {
      containerArray.push(
        <div className="table-body-item next-month">{contentArray[i - 1]}</div>
      );
    }
    return containerArray;
  };
  selectDay = (e: React.MouseEvent): void => {
    const userSelectDay = Number(e.target.innerHTML);
    if (e.target !== e.currentTarget) {
      this.setState({ userSelectDay });
      const {
        currentDate: [currentYear, currentMonth, currentDay]
      } = this.props;
      const userSelectedDate = [currentYear, currentMonth, userSelectDay];
      this.props.handleDatePickerChange(userSelectedDate);
    }
  };
  render() {
    const {
      currentDate: [currentYear, currentMonth, currentDay]
    } = this.props;
    const renderPreMonthDays = (): Array<React.ReactNode> => {
      let result = [];
      let firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay(); // 第一天是星期几
      let needAddDay = firstDayInMonth === 0 ? 6 : firstDayInMonth - 1;
      let preMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastDay = this.judgeLastDay(preMonth, currentYear);
      result = this.createPreMonthCell(
        result,
        this.createNumberSequence([], lastDay - needAddDay + 1, lastDay),
        needAddDay
      );
      return result;
    };
    const renderCurrentMonthDays = (): Array<React.ReactNode> => {
      let result = [];
      const lastDay = this.judgeLastDay(currentMonth, currentYear);
      result = this.createCurrentMonthCell(
        result,
        this.createNumberSequence([], 0, lastDay),
        lastDay
      );
      return result;
    };

    const renderNextMonthDays = (
      needDayNum: number
    ): Array<React.ReactNode> => {
      let result = [];
      result = this.createNextMonthCell(
        result,
        this.createNumberSequence([], 1, needDayNum),
        needDayNum
      );
      return result;
    };

    const renderDays = (): React.ReactNode => {
      let dayArray: Array<React.ReactNode> = [];
      const preMonthDayArray = renderPreMonthDays();
      const currentDayArray = renderCurrentMonthDays();
      dayArray = dayArray.concat(preMonthDayArray).concat(currentDayArray);
      const nextMonthDayArray = renderNextMonthDays(42 - dayArray.length);
      dayArray = dayArray.concat(nextMonthDayArray);
      return dayArray;
    };
    return (
      <div className="datepicker-body">
        <div className="table">
          <div className="table-head">
            <div className="table-head-item">一</div>
            <div className="table-head-item">二</div>
            <div className="table-head-item">三</div>
            <div className="table-head-item">四</div>
            <div className="table-head-item">五</div>
            <div className="table-head-item">六</div>
            <div className="table-head-item">七</div>
          </div>
          <div className="table-body" onClick={this.selectDay}>
            {renderDays()}
          </div>
        </div>
      </div>
    );
  }
}
export default DatePickerBody;
