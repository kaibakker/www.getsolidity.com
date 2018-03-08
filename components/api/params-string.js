import { Code } from '../text/code'



export function ParamsString({ params, maxLengthForName, whiteSpace }) {

  return params.map((item) => {
    if(maxLengthForName < params.length || !item.name) {
      return `${item.type}`
    } else {
      return `${item.type} ${item.name}`
    }
  }).join(whiteSpace == false ? "," : ", ")
}
