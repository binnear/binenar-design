import * as React from 'react';
interface Props {
  year: number,
  currentYearRanger: Array<number>,
  changeCurrentYearRanger: Function,
  getCurrentLongYearListData: Function
}
class LongYearSelectPanel extends React.Component {
  props: Props;
  constructor(props: Props) {
    super(props);
  }

  getLongYearListData = () => {
    const { year, currentYearRanger, changeCurrentYearRanger, getCurrentLongYearListData } = this.props
    return getCurrentLongYearListData(year).map((m: Array<any>, j: number) => {
      return <tr key={j} className="datetime-long-year-select-wrap-tr">
        {
          m.map((v: { status: string, longYearRanger: Array<number> }, i) => {
            let className = 'datetime-long-year-select-wrap-item'
            if (currentYearRanger[0] == v.longYearRanger[0]) {
              className = `${className} datetime-long-year-select-wrap-item-select`
            }
            if (v.status != 'current') {
              className = `${className} datetime-long-year-select-wrap-item-other`
            }
            return <td
              key={i}
              data-year={v.longYearRanger}
              onClick={(e) => changeCurrentYearRanger(e)}
              className="datetime-long-year-select-wrap-td"
            >
              <a className={className}>{`${v.longYearRanger[0]}~${v.longYearRanger[1]}`}</a>
            </td>
          })
        }
      </tr>
    })
  }

  render() {
    return <table className="datetime-long-year-select-wrap-table">
      <tbody className="datetime-long-year-select-wrap-tbody">
        {this.getLongYearListData()}
      </tbody>
    </table>
  }
}

export default LongYearSelectPanel