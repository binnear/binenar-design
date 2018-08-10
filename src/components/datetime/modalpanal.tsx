import * as React from 'react';
import * as moment from 'moment'
import Progress from './progress'
import InitPanal from './initpanal'
import YearSelectPanel from './yearselectpanal'
import MonthSelectPanel from './monthselectpanal'
import LongYearSelectPanel from './longyearselectpanal'
interface ModalPanelProps {
  value: moment.Moment,
  unmountComponentAtNode: Function,
  div: HTMLDivElement,
  formatter: string,
  onChange: Function,
  getFinalTimeToInput: Function
}
interface State {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  currentSelectDay: number,
  currentSelectYear: number,
  currentYearRanger: Array<number>,
  currentSelectMonth: number,
  showDateTimePanel: boolean,
  showYearSelectPanel: boolean,
  showMonthSelectPanel: boolean,
  currentLongYearRanger: Array<number>,
  showLongYearSelectPanel: boolean,
}
class ModalPanel extends React.Component {
  props: ModalPanelProps;
  state: State;
  constructor(props: ModalPanelProps) {
    super(props)
    this.state = {
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null,
      second: null,
      currentSelectDay: null,
      currentSelectYear: null,
      currentYearRanger: null,
      currentSelectMonth: null,
      showDateTimePanel: false,
      showYearSelectPanel: false,
      showMonthSelectPanel: false,
      currentLongYearRanger: null,
      showLongYearSelectPanel: false,
    }
  }

  componentWillReceiveProps(props: ModalPanelProps) {
    this.updateTimeStatus(props.value)
  }

  componentWillMount() {
    this.updateTimeStatus(this.props.value)
  }

  componentDidMount() {
    const { unmountComponentAtNode, div } = this.props;
    const dateTimeWrap = document.getElementById('dateTimeWrap');
    let datetime = document.getElementById('datetime');
    const leftAndTopArr = this.getOffsetLeftAndTopToBody(datetime);
    const offsetWidth = dateTimeWrap.offsetWidth;
    const offsetHeight = dateTimeWrap.offsetHeight;
    const clientWidth = document.body.clientWidth;
    const clientHeight = document.body.clientHeight;
    let offsetLeft = leftAndTopArr[0];
    let offsetTop = leftAndTopArr[1];

    if (clientWidth - offsetLeft < offsetWidth) {
      offsetLeft = offsetLeft - (offsetWidth - datetime.offsetWidth)
    }

    if (clientHeight - offsetTop < offsetHeight && offsetTop > offsetHeight) {
      offsetTop = offsetTop - (offsetHeight - datetime.offsetHeight)
    }

    dateTimeWrap.style.left = `${offsetLeft}px`;
    dateTimeWrap.style.top = `${offsetTop}px`;

    const documentClickEvent = (e: any) => {
      if (!dateTimeWrap.contains(e.target) && !datetime.contains(e.target)) {
        unmountComponentAtNode(div)
      }
      document.removeEventListener('click', documentClickEvent)
    }
    document.addEventListener('click', documentClickEvent)
  }

  getOffsetLeftAndTopToBody = (el: any) => {
    let offsetLeft = 0, offsetTop = 0;
    while (el && el.tagName !== 'body') {
      offsetLeft += el.offsetLeft;
      offsetTop += el.offsetTop;
      el = el.offsetParent
    }
    return [offsetLeft, offsetTop]
  }

  changeHourNum = (hour: number) => {
    const {
      second, minute, currentSelectDay, currentSelectYear, currentSelectMonth
    } = this.state
    this.handleOnChangeProps(this.getFinalTimeToInput({
      second, minute, hour, currentSelectDay, currentSelectYear, currentSelectMonth
    }))
  }

  changeMinuteNum = (minute: number) => {
    const {
      second, hour, currentSelectDay, currentSelectYear, currentSelectMonth
    } = this.state
    this.handleOnChangeProps(this.getFinalTimeToInput({
      second, minute, hour, currentSelectDay, currentSelectYear, currentSelectMonth
    }))
  }

  changeSecondNum = (second: number) => {
    const {
      minute, hour, currentSelectDay, currentSelectYear, currentSelectMonth
    } = this.state
    this.handleOnChangeProps(this.getFinalTimeToInput({
      second, minute, hour, currentSelectDay, currentSelectYear, currentSelectMonth
    }))
  }

  getDateList = (year: number, month: number) => {
    const lastMonth = month > 1 ? month - 1 : 12;
    const lastYear = month > 1 ? year : year - 1;
    const nextMonth = month == 12 ? 1 : month + 1;
    const nextYear = month == 12 ? year + 1 : year;
    const currentMonthNum = new Date(year, month, 0).getDate();
    const lastMonthNum = new Date(year, lastMonth, 0).getDate();
    let currentWeekDay = new Date(`${year}-${month}-01`).getDay();
    currentWeekDay = currentWeekDay === 0 ? 7 : currentWeekDay;
    let currentTempMonthNum = 0, nextTempMonthNum = 0;
    let arr: any = new Array(42);
    const dayList = arr.fill(0).map((v: number, i: number) => {
      if (i + 1 < currentWeekDay) return {
        year: lastYear,
        month: lastMonth,
        day: lastMonthNum - currentWeekDay + i + 2,
      };
      if (currentTempMonthNum < currentMonthNum) return {
        year,
        month,
        day: ++currentTempMonthNum,
      };
      return {
        year: nextYear,
        month: nextMonth,
        day: ++nextTempMonthNum,
      };
    })
    arr = new Array(6);
    return arr.fill(0).map((v: number) => {
      return dayList.splice(0, 7).map((v: number) => {
        return v;
      })
    })
  }

  getNumWithZero = (num: number) => {
    return num < 10 ? `0${num}` : num
  }

  selectDay = (e: any) => {
    let {
      hour,
      second,
      minute,
    } = this.state
    let day = Number(e.currentTarget.dataset.day);
    let year = Number(e.currentTarget.dataset.year);
    let month = Number(e.currentTarget.dataset.month);
    const currentSelectDay = day;
    const currentSelectYear = year;
    const currentSelectMonth = month;
    let timeObj = { hour, second, minute, currentSelectDay, currentSelectYear, currentSelectMonth }
    this.handleOnChangeProps(this.getFinalTimeToInput(timeObj))
  }

  // 获取moment时间下的每一项
  getMomentCellObj = (time: moment.Moment) => {
    return {
      year: time.year(),
      month: time.month() + 1,
      day: time.date(),
      hour: time.hour(),
      minute: time.minute(),
      second: time.second(),
    }
  }

  // 更新当前的时间
  updateTimeStatus = (time: moment.Moment) => {
    if (!time) time = moment()
    const timeObj = this.getMomentCellObj(time)
    const { day, year, month } = timeObj
    this.setState({
      ...timeObj,
      currentSelectDay: day,
      currentSelectYear: year,
      currentSelectMonth: month,
    })
  }

  getPreYear = () => {
    const { year, month } = this.state;
    this.setState({
      year: year - 1
    })
  }

  getPreMonth = () => {
    const { month, year } = this.state;
    const preMonth = month == 1 ? 12 : month - 1;
    const preYear = month == 1 ? year - 1 : year;
    this.setState({
      year: preYear,
      month: preMonth
    })
  }

  getNextYear = () => {
    const { year } = this.state;
    this.setState({
      year: year + 1
    })
  }

  getPreTenYear = () => {
    const { year, currentYearRanger } = this.state;
    this.setState({
      year: year - 10,
      currentYearRanger: [currentYearRanger[0] - 10, currentYearRanger[1] - 10]
    })
  }

  getNextTenYear = () => {
    const { year, currentYearRanger } = this.state;
    this.setState({
      year: year + 10,
      currentYearRanger: [currentYearRanger[0] + 10, currentYearRanger[1] + 10]
    })
  }

  getPreHandridYear = () => {
    const { year, currentYearRanger, currentLongYearRanger } = this.state;
    this.setState({
      year: year - 100,
      currentYearRanger: [currentYearRanger[0] - 100, currentYearRanger[1] - 100],
      currentLongYearRanger: [currentLongYearRanger[0] - 100, currentLongYearRanger[1] - 100]
    })
  }

  getNextHandridYear = () => {
    const { year, currentYearRanger, currentLongYearRanger } = this.state;
    this.setState({
      year: year + 100,
      currentYearRanger: [currentYearRanger[0] + 100, currentYearRanger[1] + 100],
      currentLongYearRanger: [currentLongYearRanger[0] + 100, currentLongYearRanger[1] + 100]
    })
  }

  getNextMonth = () => {
    const { month, year } = this.state;
    const nextMonth = month == 12 ? 1 : month + 1;
    const nextYear = month == 12 ? year + 1 : year;
    this.setState({
      year: nextYear,
      month: nextMonth
    })
  }

  showYearSelectPanel = () => {
    const { year } = this.state;
    const first = parseInt(String(year / 10)) * 10;
    const currentYearRanger = [first, first + 9]
    this.setState({
      currentYearRanger,
      showYearSelectPanel: true,
      showMonthSelectPanel: false,
    })
  }

  showLongYearSelectPanel = () => {
    const { year } = this.state;
    const first = parseInt(String(year / 100)) * 100
    const currentLongYearRanger = [first, first + 99]
    this.setState({
      currentLongYearRanger,
      showYearSelectPanel: false,
      showLongYearSelectPanel: true,
    })
  }

  showMonthSelectPanel = () => {
    this.setState({
      showYearSelectPanel: false,
      showMonthSelectPanel: true,
      showLongYearSelectPanel: false,
    })
  }

  getCurrentYearListData = (year: number) => {
    let first = parseInt(String(year / 10)) * 10 - 1;
    let arr: any = new Array(12);
    let yearList = arr.fill(0).map((v: number, i: number) => {
      return {
        year: first++,
        status: i > 0 && i < 11 ? 'current' : 'other'
      }
    })
    arr = new Array(4);
    return arr.fill(0).map((v: number) => {
      return yearList.splice(0, 3)
    })
  }

  getCurrentLongYearListData = (year: number) => {
    let first = parseInt(String(year / 100)) * 100 - 10;
    let arr: any = new Array(12);
    let longYearList = arr.fill(0).map((v: number, i: number) => {
      return {
        longYearRanger: [first + 10 * i, first + 10 * i + 9],
        status: i > 0 && i < 11 ? 'current' : 'other'
      }
    })
    arr = new Array(4);
    return arr.fill(0).map((v: number) => {
      return longYearList.splice(0, 3)
    })
  }

  changeYear = (e: any) => {
    const { month } = this.state;
    const currentYear = Number(e.currentTarget.dataset.year)
    this.setState({
      showYearSelectPanel: false,
      year: Number(e.currentTarget.dataset.year)
    })
  }

  changeMonth = (e: any) => {
    this.setState({
      showMonthSelectPanel: false,
      month: Number(e.currentTarget.dataset.month)
    })
  }

  changeCurrentYearRanger = (e: any) => {
    const longYearRanger = e.currentTarget.dataset.year.split(',')
    this.setState({
      year: Number(longYearRanger[0]),
      showYearSelectPanel: true,
      showLongYearSelectPanel: false,
      currentYearRanger: [Number(longYearRanger[0]), Number(longYearRanger[1])],
    })
  }

  getInitHeader = () => {
    const { year, month } = this.state;
    return <div className="datetime-date-panel-head">
      <a
        onClick={this.getPreYear}
        className="datetime-date-pre-year-btn"
      ></a>
      <a
        onClick={this.getPreMonth}
        className="datetime-date-pre-month-btn"
      ></a>
      <span>
        <a
          className="datetime-date-year-select"
          onClick={this.showYearSelectPanel}
        >{year}年</a>
        <a
          onClick={this.showMonthSelectPanel}
          className="datetime-date-month-select"
        >{month}月</a>
      </span>
      <a
        onClick={this.getNextMonth}
        className="datetime-date-next-month-btn"
      ></a>
      <a
        onClick={this.getNextYear}
        className="datetime-date-next-year-btn"
      ></a>
    </div>
  }

  getYearPanelHeader = () => {
    const { currentYearRanger } = this.state;
    return <div className="datetime-date-panel-head">
      <a
        onClick={this.getPreTenYear}
        className="datetime-date-pre-year-btn"
      ></a>
      <span>
        <a
          className="datetime-date-year-select"
          onClick={this.showLongYearSelectPanel}
        >{`${currentYearRanger[0]}~${currentYearRanger[1]}`}</a>
      </span>
      <a
        onClick={this.getNextTenYear}
        className="datetime-date-next-year-btn"
      ></a>
    </div>
  }

  getYearRangerPanelHeader = () => {
    const { currentLongYearRanger } = this.state;
    return <div className="datetime-date-panel-head">
      <a
        onClick={this.getPreHandridYear}
        className="datetime-date-pre-year-btn"
      ></a>
      <span>
        <span
          className="datetime-date-year-select nolink"
        >{`${currentLongYearRanger[0]}~${currentLongYearRanger[1]}`}</span>
      </span>
      <a
        onClick={this.getNextHandridYear}
        className="datetime-date-next-year-btn"
      ></a>
    </div>
  }

  getMonthPanelHeader = () => {
    const { year } = this.state;
    return <div className="datetime-date-panel-head">
      <a
        onClick={this.getPreYear}
        className="datetime-date-pre-year-btn"
      ></a>
      <span>
        <a
          className="datetime-date-year-select"
          onClick={this.showYearSelectPanel}
        >{year}</a>
      </span>
      <a
        onClick={this.getNextYear}
        className="datetime-date-next-year-btn"
      ></a>
    </div>
  }

  getFinalTimeToInput = ({
    hour, second, minute, currentSelectDay, currentSelectYear, currentSelectMonth
  }: {
      hour: number, second: number, minute: number, currentSelectDay: number, currentSelectYear: number, currentSelectMonth: number
    }) => {
    const { formatter } = this.props
    const time = `${
      currentSelectYear
      }-${
      this.getNumWithZero(currentSelectMonth)
      }-${
      this.getNumWithZero(currentSelectDay)
      } ${
      this.getNumWithZero(hour)
      }:${
      this.getNumWithZero(minute)
      }:${
      this.getNumWithZero(second)
      }`
    if (!formatter) return time
    return moment(moment(time, 'YYYY-MM-DD HH:mm:ss')).format(formatter)
  }

  confirmTime = () => {
    const {
      hour,
      second,
      minute,
      currentSelectDay,
      currentSelectYear,
      currentSelectMonth,
    } = this.state;
    const { unmountComponentAtNode, div } = this.props
    this.hideDatetimePanel()
    unmountComponentAtNode(div)
  }

  handleOnChangeProps = (time: string) => {
    const { onChange } = this.props
    onChange && onChange(moment(time, 'YYYY-MM-DD HH:mm:ss'))
  }

  hideDatetimePanel = () => {
    this.setState({
      showDateTimePanel: false,
      showYearSelectPanel: false,
      showMonthSelectPanel: false,
      showLongYearSelectPanel: false,
    })
  }


  render() {
    const {
      day,
      year,
      hour,
      month,
      second,
      minute,
      currentSelectDay,
      currentSelectYear,
      currentYearRanger,
      currentSelectMonth,
      showYearSelectPanel,
      showMonthSelectPanel,
      showLongYearSelectPanel,
    } = this.state
    const { value, getFinalTimeToInput } = this.props;
    const getDateListEl = {
      day,
      year,
      month,
      currentSelectDay,
      currentSelectYear,
      currentSelectMonth,
      selectDay: this.selectDay,
      getDateList: this.getDateList,
    }
    const yearSelectPanelProps = {
      year,
      changeYear: this.changeYear,
      getCurrentYearListData: this.getCurrentYearListData,
    }
    const longYearSelectPanelProps = {
      year,
      currentYearRanger,
      changeCurrentYearRanger: this.changeCurrentYearRanger,
      getCurrentLongYearListData: this.getCurrentLongYearListData,
    }
    const monthSelectPanelProps = {
      month,
      changeMonth: this.changeMonth
    }
    return <div className="datetime-wrap" id="dateTimeWrap">
      <div className="datetime-date-panel">
        <input
          readOnly
          className="datetime-date-panel-input"
          value={getFinalTimeToInput(value)}
        />
        {
          !showYearSelectPanel && !showLongYearSelectPanel && !showMonthSelectPanel && this.getInitHeader()
        }
        {
          showYearSelectPanel && this.getYearPanelHeader()
        }
        {
          showLongYearSelectPanel && this.getYearRangerPanelHeader()
        }
        {
          showMonthSelectPanel && this.getMonthPanelHeader()
        }
        <div className="datetime-date-panel-body">
          {
            !showYearSelectPanel && !showLongYearSelectPanel && !showMonthSelectPanel &&
            <InitPanal {...getDateListEl} />
          }
          {
            showYearSelectPanel &&
            <YearSelectPanel {...yearSelectPanelProps} />
          }
          {
            showLongYearSelectPanel &&
            <LongYearSelectPanel {...longYearSelectPanelProps} />
          }
          {
            showMonthSelectPanel &&
            <MonthSelectPanel {...monthSelectPanelProps} />
          }
        </div>
        <div className="datetime-date-panel-control">
          <div className="datetime-date-panel-control-item">
            <div className="datetime-date-panel-control-title">时间</div>
            <div className="datetime-date-panel-control-content">{this.getNumWithZero(hour)}:{this.getNumWithZero(minute)}:{this.getNumWithZero(second)}</div>
          </div>
          <div className="datetime-date-panel-control-item">
            <div className="datetime-date-panel-control-title">时</div>
            <div className="datetime-date-panel-control-content">
              <Progress changeTimeNum={this.changeHourNum} type={23} time={hour} />
            </div>
          </div>
          <div className="datetime-date-panel-control-item">
            <div className="datetime-date-panel-control-title">分</div>
            <div className="datetime-date-panel-control-content">
              <Progress changeTimeNum={this.changeMinuteNum} type={59} time={minute} />
            </div>
          </div>
          <div className="datetime-date-panel-control-item">
            <div className="datetime-date-panel-control-title">秒</div>
            <div className="datetime-date-panel-control-content">
              <Progress changeTimeNum={this.changeSecondNum} type={59} time={second} />
            </div>
          </div>
        </div>
        <div className="datetime-date-panel-foot">
          {/* <a className="datetime-date-panel-foot-now">现在</a> */}
          <a
            onClick={this.confirmTime}
            className="datetime-date-panel-foot-confirm"
          >确认</a>
        </div>
      </div>
    </div>
  }
}

export default ModalPanel