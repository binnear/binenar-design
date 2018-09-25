import * as React from 'react';
import Head from 'components/head/head';
import Foot from 'components/foot/foot';
import Enhance from 'components/enhance/enhance';
import Student from 'components/student/student';
const EnhanceStudent: any = Enhance(Student)
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
      <EnhanceStudent />
      <Foot />
    </div>
  }
}

export default Root