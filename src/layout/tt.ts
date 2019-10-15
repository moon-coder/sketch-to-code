/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2019/10/15
 **/


let flags = ['0','-1','1'];


for (let i = 0, iLen = flags.length; i < iLen; i++) {
  let xbeg = flags[i];

  for (let j = 0, jLen = flags.length; j < jLen; j++) {
    let xend = flags[j];

    for (let k = 0, kLen = flags.length; k < kLen; k++) {
      let ybeg = flags[k];
      for (let l = 0, lLen = flags.length; l < lLen; l++) {
        let yend = flags[l];

        if(xbeg < xend && yend ){

          console.log(`"${flag}::${flagElement}::${jLenElement}::${jLenElementElement}":"",`)
        }

      }
    }
  }
}