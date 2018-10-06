import * as React from 'react';
import Head from 'components/head/head';
import Foot from 'components/foot/foot';
import Canvas from 'components/canvas/canvas';
import Portal from 'components/portal/portal';
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
      <Portal>
        <Canvas />
      </Portal>
      <Foot />
    </div>
  }
}

export default Root