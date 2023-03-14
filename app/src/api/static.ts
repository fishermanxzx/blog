import service from '@/request'

export const getMarkdownFile = <T>(filePath: string) => service<T>({
  url: `/markdownPage${filePath}`,
  method: 'GET'
})
