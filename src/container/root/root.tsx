import * as React from 'react';
import Head from 'components/head/head';
import Foot from 'components/foot/foot';
const s = require('./root.pcss');
interface Props {

}
class Root extends React.Component {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    document.getElementById('root').style.height = '100%';
  }


  render() {
    return <div className={s.root}>
      <Head />
      <Foot />
    </div>
  }
}

export default Root