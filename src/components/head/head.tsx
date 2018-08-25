import * as React from 'react';
const s = require('./head.pcss');
interface Props {

}
class Head extends React.Component {
  constructor(props: Props) {
    super(props)
  }


  render() {
    return <div className={s.head}>天地不仁，以万物为刍狗！</div>
  }
}

export default Head