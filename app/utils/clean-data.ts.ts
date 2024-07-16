export function cleanData(param: Record<any, any>) {
  // Clone object for immutability
  const obj = JSON.parse(JSON.stringify(param))

  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null || obj[key] === '')
      delete obj[key]
    else if (Array.isArray(obj[key]))
      obj[key] = obj[key].map((item: any) => cleanData(item))
    else if (typeof obj[key] === 'object')
      cleanData(obj[key])
  }
  return obj
}
