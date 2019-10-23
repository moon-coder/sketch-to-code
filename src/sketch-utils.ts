import {Layer,Slice} from "./types-sketch";
import {Sketch,SketchDom} from './outer/sketch';

/**
 * 导出图片
 */
export const exportImg = (layer: Layer): string => {
  let slice:Slice = new SketchDom.Slice({
    frame: layer.frame,
  });
  slice.parent = layer.parent;
  return sliceImg(slice);
}

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
    Sketch.export(slice, {
      formats: 'png',
      output: '/Users/dong/Falcon/sketch-to-code/temp/img',
    });
    slice.remove();
    return `./img/${imgName}.png`;
  };
})();
