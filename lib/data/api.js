const { parse } = require('url')

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default function (abi, path) {
  const data = []

  data.push({
    id: 'payable',
    name: 'payable functions',
    posts: abi.filter(({type, payable}) => { return type === 'function' && payable }).map((abi) => {
      return {
        abi: abi,
        description: {},
        type: "ABIDescription"
      }
    })
  })

  data.push({
    id: 'non-payable',
    name: 'Non-payable functions',
    posts: abi.filter(({type, constant, payable}) => { return type === 'function' && !payable && !constant }).map((abi) => {
      return {
        abi: abi,
        description: {},
        type: "ABIDescription"
      }
    })
  })

  data.push({
    id: 'constant',
    name: 'constant functions',
    posts: abi.filter(({type, constant}) => { return type === 'function' && constant }).map((abi) => {
      return {
        abi: abi,
        description: {},
        type: "ABIDescription"
      }
    })
  })


  data.push({
    id: 'constructor',
    name: 'constructor',
    posts: abi.filter(({type}) => { return type === 'constructor' }).map((abi) => {
      return {
        abi: abi,
        description: {},
        type: "ABIDescription"
      }
    })
  })

  data.push({
    id: 'fallback',
    name: 'fallback',
    posts: abi.filter(({type}) => { return type === 'fallback' }).map((abi) => {
      return {
        abi: abi,
        description: {},
        type: "ABIDescription"
      }
    })
  })


  return data.map(({ posts, ...rest }) => {
    return {
      ...rest,
      posts: posts.map(p => {
        if(p.abi ) {
          const id = p.abi.name || p.abi.type

          const href = path + "#" + id
          const name = id.replace(/([A-Z]+)/g, function(str){ return " " + str }).capitalize().replace("_ ", " ").replace("_ ", " ").replace("_ ", " ")
          const { hash } = parse(href)
          const description = {}
          return { ...p, id: id, name: name, href: href, hash: hash, url: "/", description: description }
        } else {
          const { hash } = parse(p.href)
          return { ...p, hash }
        }

      })
    }
  })
}
