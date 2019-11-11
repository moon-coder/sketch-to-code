
import {join} from 'path';
import * as fs from "fs";
import layout from "../../layout";
import {toJSON} from "../../util";
import {loadeOrigin} from "../util";
import {readJSONSync} from  'fs-extra';
import {ICompData, INode} from "../../types";
import getNodes from "../../sketch/get-nodes";
import h5Generrator from "../../generators/html5";

jest.mock('../../outer/sketch');


const test = (caseName: string) => {
  const nodes: INode[] = readJSONSync(join(__dirname, caseName + ".json"));

  const node: INode = layout(nodes);
  // 代码生成
  const code: ICompData = h5Generrator(node);
  let targetDir  =join(__dirname,'../../../',"play-ground/src/pages/api/manager/components");

  fs.writeFileSync(join(targetDir,"demo.tsx"), getCompSrc(code.vdom));
  fs.writeFileSync(join(targetDir,"demo.less"), code.style);
  //
  // fs.writeFileSync(`/Users/dong/yzfworkbench/cloud-pulse/src/pages/api/manager/components/demo.tsx`, getCompSrc(code.vdom));
  // fs.writeFileSync(`/Users/dong/yzfworkbench/cloud-pulse/src/pages/api/manager/components/demo.less`, code.style);
  // debugger;
  const result = toJSON(node);
  expect(result).toMatchSnapshot(caseName);
}


const testOrigin = (caseName: string) => {
  let layers = loadeOrigin(join(__dirname,caseName+".json"));
  const nodes: INode[] = getNodes(layers.layers[0]);

  //
  // const nodes: INode[] = readJSONSync(join(__dirname, caseName + ".json"));

  const node: INode = layout(nodes);
  // 代码生成
  const code: ICompData = h5Generrator(node);
  let targetDir  =join(__dirname,'../../../',"play-ground/src/pages/api/manager/components");
  fs.writeFileSync(join(targetDir,"demo.tsx"), getCompSrc(code.vdom));
  fs.writeFileSync(join(targetDir,"demo.less"), code.style);

  const result = toJSON(node);
  expect(result).toMatchSnapshot(caseName);
}

it('单行文本', function () {
  test('flex0');
});


it('单行文本1.1', function () {
  testOrigin('flex1.1');
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
  test('flex4');
});


it('列图标生成', function () {
  testOrigin('flex5');
});


it('首页生成', function () {
  //TODO 组件包围的情况产生;
  testOrigin('flex6');
});


it('券使用说明', function () {
  testOrigin('flex7');
});

it('券详情页面', function () {
  //TODO 图片尺寸是对的. 为什么没有填满呢 ?
  testOrigin('flex8');
});

let getCompSrc=(dom:string)=>`
import * as React from 'react';
import * as T from '../types';
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