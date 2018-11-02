import * as React from 'react';
const s = require('./content.pcss');
const paint1 = require('public/images/paint1.svg');
const paint2 = require('public/images/paint2.svg');

export default function Content() {
  return <div className={s.content}>
    <span className={s.paint} style={{ background: `no-repeat 0% 44%/94% url(${paint1})` }}>
      <i className="iconfont icon-blog"></i>
      <a
        href="/blog/"
        data-cnzz-event={JSON.stringify({ category: '首页', action: '进入我的博客', label: 'blog' })}
      >Blog</a>
    </span>
    <span className={s.paint} style={{ background: `no-repeat 0% 30%/94% url(${paint2})` }}>
      <i className="iconfont icon-github"></i>
      <a
        href="https://github.com/binnear/"
        data-cnzz-event={JSON.stringify({ category: '首页', action: '进入我的github', label: 'github' })}
      >Github</a>

    </span>
  </div>
}
