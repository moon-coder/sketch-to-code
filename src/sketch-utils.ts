import {Layer, Slice} from "./types-sketch";
const sketch = require('sketch');
const Slice = require('sketch/dom').Slice;

/**
 * 导出图片
 */
export const exportImg = (layer: Layer) => {
  let slice = new Slice({
    frame: {
      x: 0,
      y: 0,
      width: layer.frame.width,
      height: layer.frame.height,
    },
  });
  // 1.图片的情况
  if (layer.type === 'Image') {
    slice.parent = layer.parent;
    const imgSrc = sliceImg(slice);
    layer.__imgSrc = imgSrc;
  }
  // 2."-合并"的情况
  if (layer.type === 'Group' && layer.name.endsWith('-合并')) {
    slice.parent = layer;
    const imgSrc = sliceImg(slice);
    layer.__imgSrc = imgSrc;
  }
  // 3.背景填充的情况
  const fill = layer.style.fills[0];
  if (fill && fill.pattern && fill.pattern.image) {
    // TODO
  }
};

/**
 * 切片导出
 */
const sliceImg = ((): Function => {
  let imgIdx = 0;
  return (slice: Slice): string => {
    const imgName = `img${imgIdx++}`;
    slice.name = imgName;
    slice.exportFormats = [
      {
        fileFormat: 'png',
        prefix: imgName,
        suffix: 'png',
        size: '2x',
      },
    ];
    sketch.export(slice, {
      formats: 'png',
      output: '/Users/shejijiang/Desktop/temp/img',
    });
    slice.remove();
    return `./img/${imgName}.png`;
  };
})();
