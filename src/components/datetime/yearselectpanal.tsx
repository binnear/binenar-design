import * as React from 'react';
interface Props {
  year: number,
  changeYear: Function,
  getCurrentYearListData: Function
}
class YearSelectPanel extends React.Component {
  props: Props;
  constructor(props: Props) {
    super(props);
  }

  getYearListData = () => {
    const { year, changeYear, getCurrentYearListData } = this.props
    return getCurrentYearListData(year).map((m: Array<any>, j: number) => {
      return <tr key={j} className="datetime-year-select-wrap-tr">
        {
          m.map((v: { year: number, status: string }, i: number) => {
            let className = 'datetime-year-select-wrap-item'
            if (v.year == year) {
              className = `${className} datetime-year-select-wrap-item-select`
            }
            if (v.status != 'current') {
              className = `${className} datetime-year-select-wrap-item-other`
            }
            return <td
              key={i}
              data-year={v.year}
              onClick={(e) => { changeYear(e) }}
              className="datetime-year-select-wrap-td"
            >
              <a className={className}>{v.year}</a>
            </td>
          })
        }
      </tr>
    })
  }

  render() {
    return <table className="datetime-year-select-wrap-table">
      <tbody className="datetime-year-select-wrap-tbody">
        {this.getYearListData()}
      </tbody>
    </table>
  }
}

export default YearSelectPanel