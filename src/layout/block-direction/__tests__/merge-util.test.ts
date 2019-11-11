/**
 * @desc
 *
 * 可以画个坐标看这里的关系;
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/11/8
 **/
import {lineCompare} from "../merge-util";
//
//
//
// '0::-1::0::1': 'equals', //相等重合
//   '0::-1::-1::1': 'left-contain', //左包含
//   '0::-1::1::1': 'left-contained', //左被包含
//   '-1::-1::0::1': 'right-contained', //右被包含
//
//   '-1::-1::-1::0': 'left-overlap', //左重合
//   '-1::-1::-1::-1': 'left', //左
//   '-1::-1::-1::1': 'left-overlap', //左重合
//
//   '-1::-1::1::1': 'contained', //被包含
//   '1::0::1::1': 'right', //右侧
//   '1::-1::0::1': 'right-contain', //右包含
//   '1::-1::-1::1': 'contain', //包含
//   '1::-1::1::1': 'right-overlap', //右重合
//   '1::1::1::1': 'right', //右
//
describe('矩形区域比较', () => {

  it('equals重合', async () => {

  });
});

describe('线段比较', () => {
  it('equals重合', async () => {
    let lineOne = {beg:0,end:10},lineTwo={beg:0,end:10};
    expect(lineCompare(lineOne,lineTwo)).toEqual("equals");
  });

  it('左包含', async () => {
    let lineOne = {beg:0,end:10},lineTwo={beg:0,end:5};
    expect(lineCompare(lineOne,lineTwo)).toEqual("left-contain");
  });


  it('右包含', async () => {
    let lineOne = {beg:0,end:10},lineTwo={beg:5,end:10};
    expect(lineCompare(lineOne,lineTwo)).toEqual("right-contain");
  });

  it('左被包含', async () => {
    let lineOne = {beg:0,end:10},lineTwo={beg:0,end:15};
    expect(lineCompare(lineOne,lineTwo)).toEqual("left-contained");
  });

  it('右被包含', async () => {
    let lineOne = {beg:10,end:15},lineTwo={beg:0,end:15};
    expect(lineCompare(lineOne,lineTwo)).toEqual("right-contained");
  });


  it('右重合', async () => {
    let lineOne = {beg:0,end:15},lineTwo={beg:10,end:20};
    expect(lineCompare(lineOne,lineTwo)).toEqual("right-overlap");
  });

  it('左重合', async () => {
    let lineOne = {beg:0,end:15},lineTwo={beg:-5,end:5};
    expect(lineCompare(lineOne,lineTwo)).toEqual("left-overlap");
  });


  it('左', async () => {
    let lineOne = {beg:0,end:15},lineTwo={beg:-5,end:-2};
    expect(lineCompare(lineOne,lineTwo)).toEqual("left");
  });

  it('右', async () => {
    let lineOne = {beg:0,end:15},lineTwo={beg:20,end:25};
    expect(lineCompare(lineOne,lineTwo)).toEqual("right");
  });


});
 