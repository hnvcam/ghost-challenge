import names from './names.json'
import _ from 'lodash'

export function generateName (userId) {
  const hash = _.reduce(_.split(userId, ''), function (acc, char) {
    acc += char.charCodeAt(0)
    return acc
  }, 0)

  return names.first[hash % names.first.length] + ' ' + names.last[hash % names.last.length]
}
