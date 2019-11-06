import {ICompData, INode} from "../../types";
import layout from "../../layout";
import {readJSONSync} from  'fs-extra';

import {join} from 'path';
import {toJSON} from "../../util";
import h5Generrator from "../../generators/html5";
import * as fs from "fs";

jest.mock('../../outer/sketch');


const test = (caseName: string) => {
  const nodes: INode[] = readJSONSync(join(__dirname, caseName + ".json"));

  const node: INode = layout(nodes);
  // 代码生成
  const code: ICompData = h5Generrator(node);
  // fs.writeFileSync(`/Users/dong/yzfworkbench/cloud-pulse/src/pages/api/manager/components/demo.tsx`, getCompSrc(code.vdom));
  // fs.writeFileSync(`/Users/dong/yzfworkbench/cloud-pulse/src/pages/api/manager/components/demo.less`, code.style);
  // debugger;
  const result = toJSON(node);
  expect(result).toMatchSnapshot(caseName);
}

it('单行文本', function () {
  test('flex0');
});

it('多行文本', function () {
  test('flex1');
});

it('多行图文列表', function () {
  test('flex2');
});

it('单行图文混排', function () {
  //TODO 这个生成的有点问题.. 两边靠近边界 或边界距离相等 应该 是space between
  test('flex3');
});


it('多行重复文字', function () {
  //TODO 这个生成的有点问题.. 两边靠近边界 或边界距离相等 应该 是space between
  test('flex4');
});

let getCompSrc=(dom:string)=>`
import * as React from 'react';
import * as T from '../types';
import './search.less';
import './demo.less'
import actions from '../actions/index';
import {connect} from 'react-redux';
import {store2Props} from '../selectors';

type ISearchProps = T.IProps & T.ISearchProps;

@connect<Partial<ISearchProps>, T.ISearchState>(
  store2Props,
  actions,
)
export default class Search extends React.Component<
  Partial<ISearchProps>,
  T.ISearchState
> {
  constructor(props: ISearchProps) {
    super(props);
  }

  /**
    
*/
  render() {
    let {
      actions: {action},
      main,
    } = this.props;

    return (
      <div className="search">
        ${dom.replace(/class/ig,"className")}
      </div>
    );
  }
}

//create by moon https://github.com/creasy2010/moon
`