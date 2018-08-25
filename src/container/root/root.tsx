import * as React from 'react';
import Foot from 'components/foot/foot';
import Head from 'components/head/head';
import TabPanel from 'container/TabPanel/TabPanel';
import EditorPanel from 'container/editorPanel/editorPanel';
import MountPanel from 'container/mountPanel/mountPanel';
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
      <div className={s.panel}>
        <TabPanel />
        <EditorPanel />
        <MountPanel />
      </div>
      <Foot />

    </div>
  }
}

export default Root