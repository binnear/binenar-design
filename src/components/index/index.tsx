import * as React from 'react';
import * as s from './index.pcss';
interface Props {

}
class Index extends React.Component {
  constructor(props: Props) {
    super(props)
  }


  render() {
    return <div className={s.index}>
      <div className={s.head}>
        binnear
      </div>
      <div className={s.content}>
        <div className={s.item}>我的笔记</div>
        <div className={s.item}>我的文章</div>
        <div className={s.item}>我的日记</div>
        <div className={s.item}>我的组件</div>
      </div>
      <div className={s.footer}>
        <span>binenar`blog ©2018 </span>
        <span>粤ICP备18092259号-1 </span>
      </div>
    </div>
  }
}

export default Index