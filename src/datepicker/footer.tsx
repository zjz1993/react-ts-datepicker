import * as React from "react";
import "./style/footer.css";

interface FooterProps {
  resetDate: () => void;
}

class DatePickerFooter extends React.Component<FooterProps> {
  render() {
    return (
      <div className="datepicker-footer">
        <span className="today-btn" onClick={this.props.resetDate}>
          今天
        </span>
      </div>
    );
  }
}
export default DatePickerFooter;
