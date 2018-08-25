import * as React from 'react';
const s = require('./tabPanel.pcss');
interface Props {

}
class TabPanel extends React.Component {
  constructor(props: Props) {
    super(props)
  }


  render() {
    return <div className={s.tabPanel}>
      <ul>
        <li className={s.item}>Css</li>
      </ul>
    </div>
  }
}

export default TabPanel