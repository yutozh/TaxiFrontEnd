import moment from 'moment'
import curry from 'lodash.curryright'

// 设置localStorage
export const setLocalStorage = (key, obj) => {
  if (typeof obj === 'string') {
    window.localStorage.setItem(key, obj)
  } else {
    window.localStorage.setItem(key, JSON.stringify(obj))
  }
}
// 获取localStorage
export const getLocalStorage = (key) => {
  let obj = window.localStorage.getItem(key)
  if (!obj) { return }
  try {
    return JSON.parse(obj)
  } catch (e) {
    return obj
  }
}
/**
 * 存储localStorage
 */
export const setSessionStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getSessionStore = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeSessionStore = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

// 递归查询对象是否拥有系列属性
export const hasInDeep = function (obj, attrArgs = []) {
  if (attrArgs.length === 0) { return true }
  if (!obj || !Reflect.has(obj, attrArgs[0])) { return false }
  return hasInDeep(obj[attrArgs[0]], attrArgs.slice(1))
}

/**
 * @description 函数式 - 组合
 * @param {any} funcs
 */
export const compose = (...funcs) => x => funcs.reduceRight((pre, cur, i, arr) => cur(pre), x)

/**
 * @description 函数式 - 柯里化
 * @param {any} f
 * @returns
 */
export const curryT = f => {
  const len = f.length
  let args = []
  const wrap = function () {
    args.push(...Array.from(arguments))
    return args.length >= len ? f.apply(null, args.reverse()) : wrap
  }
  return len ? wrap : f.apply(null)
}

export const groupBy = (collection, iteratee) => {
  return collection.reduce((pre, cur, i, arr) => {
    const key = iteratee(cur)
    pre[key] = pre[key] || []
    pre[key].push(cur)
    return pre
  }, {})
}

export const replaceIf = curry((str, reg, chars) => reg.test(str) ? chars : str)

export const getRangeIndex = (...args) => num => args.filter(v => v <= num).length
export const getAreaIndex = getRangeIndex(50000, 200000, 1000000, 5000000)
export {moment}
