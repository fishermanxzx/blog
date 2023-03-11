const requireMarkdownContext = require.context('/public/markdown', true, /\.md$/)
const mardownPaths = requireMarkdownContext.keys()
const transformMenuItem = (path: string) => {
  const [filePath, fileName] = path.split('/').slice(1)
  return {
    filePath,
    fileName: fileName.replace('.md', '')
  }
}
const transformMenus = (dir: string) => {
  const menus = mardownPaths.filter(path => {
    const pathArr = path.split('/')
    return pathArr.length === 3 && pathArr.includes(dir.slice(1))
  }).map(transformMenuItem)
  return menus
}
export {
  mardownPaths,
  transformMenus
}
