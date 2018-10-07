import * as React from 'react';
import Dog from 'components/dog/dog';
import Foot from 'components/foot/foot';
import Canvas from 'components/canvas/canvas';
import Portal from 'components/portal/portal';
import Content from 'container/content/content';
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
      <Portal>
        <Canvas />
      </Portal>
      <Portal>
        <Dog />
      </Portal>
      <Content />
      <Foot />
    </div>
  }
}

export default Root