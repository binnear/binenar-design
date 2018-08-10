import * as React from 'react';
import { weekList } from './defaultConfig'
interface Props {
  day: number,
  year: number,
  month: number,
  selectDay: Function,
  currentSelectDay: number,
  currentSelectYear: number,
  currentSelectMonth: number,
  getDateList: Function,
}
class InitPanal extends React.Component {
  props: Props;
  constructor(props: Props) {
    super(props)

  }

  getWeekList = () => {
    return weekList.map(v => {
      return <th className="datetime-date-column-header" key={v}><span>{v}</span></th>
    })
  }

  getDateList = () => {
    const {
      day,
      year,
      month,
      selectDay,
      currentSelectDay,
      currentSelectYear,
      currentSelectMonth,
      getDateList
    } = this.props;
    const lastMonth = month > 1 ? month - 1 : 12;
    const nextMonth = month == 12 ? 1 : month + 1;
    const currentMonthNum = new Date(year, month, 0).getDate();
    return getDateList(year, month).map((m: Array<object>, j: number) => {
      return <tr key={j}>
        {
          m.map((v: { day: number, month: number, year: number }, i: number) => {
            let className = 'datetime-date-column-cell-inner';
            if (day == v.day && month == v.month && year == v.year) {
              className = 'datetime-date-column-cell-inner datetime-date-column-cell-inner-selected'
              if (day == currentSelectDay && month == currentSelectMonth && year == currentSelectYear) {
                className = `${className} datetime-date-column-cell-inner-current-selected`
              }
            }
            if (month == v.month && year == v.year && day != v.day && currentSelectDay > currentMonthNum && v.day == currentMonthNum) {
              className = 'datetime-date-column-cell-inner datetime-date-column-cell-inner-selected'
            }
            if ((v.month == lastMonth || v.month == nextMonth) && year == v.year) {
              className = `${className} datetime-date-column-cell-inner-last-next-month`
            }
            return <td key={i} className="datetime-date-column-cell">
              <span
                onClick={(e) => { selectDay(e) }}
                className={className}
                data-day={String(v.day)}
                data-year={String(v.year)}
                data-month={String(v.month)}
              >
                {v.day}
              </span>
            </td>
          })
        }
      </tr>
    })
  }

  render() {
    return <table>
      <thead><tr>{this.getWeekList()}</tr></thead>
      <tbody>{this.getDateList()}</tbody>
    </table>
  }
}
export default InitPanal