const vm = require('vm')
const { readFileSync } = require('fs')
const path = require('path')
// 当前路径
const currentPath = process.cwd()
// 文件名
const filename = path.resolve(currentPath, '../demo/demo1.js')
// 源代码
let source = readFileSync(filename, 'utf-8')
// 包裹函数
const wrap = source => `(function(modules){${source}\nreturn modules})` 
// 执行包裹
source = wrap(source)
//立即执行代码
const fn = vm.runInThisContext(source)
// Module对象
function Module() {
  this.exports = {}
}
// 实例化
const modules = new Module()
// 传递odules
const bundle = fn(modules)
// 执行
console.log(bundle.exports(6, 4))