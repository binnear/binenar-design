import * as React from 'react';
import { monthList } from './defaultConfig'
interface Props {
  month: number,
  changeMonth: Function
}
class MonthSelectPanel extends React.Component {
  props: Props
  constructor(props: Props) {
    super(props)
  }

  getMonthList = () => {
    const { month, changeMonth } = this.props;
    const tempMonthList = JSON.parse(JSON.stringify(monthList))
    let arr: any = new Array(4)
    return arr.fill(0).map((v: number) => {
      return tempMonthList.splice(0, 3);
    }).map((m: Array<number>, j: number) => {
      return <tr key={j} className="datetime-year-select-wrap-tr">
        {
          m.map((v: any, i: number) => {
            let className = 'datetime-year-select-wrap-item'
            if (v.value == month) {
              className = `${className} datetime-year-select-wrap-item-select`
            }
            return <td
              key={i}
              data-month={v.value}
              onClick={(e) => changeMonth(e)}
              className="datetime-year-select-wrap-td"
            >
              <a className={className}>{v.text}</a>
            </td>
          })
        }
      </tr>
    })
  }

  render() {
    return <table className="datetime-year-select-wrap-table">
      <tbody className="datetime-year-select-wrap-tbody">
        {this.getMonthList()}
      </tbody>
    </table>
  }
}

export default MonthSelectPanel