import service from '@/request'

export const getMarkdownFile = <T>(filePath: string) => service<T>({
  url: `/markdown${filePath}`,
  method: 'GET'
})
