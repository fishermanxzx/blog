import MarkdownFile from '@/pages/components/MarkdownFile'
import AnchorsMenu from '@/components/AnchorsMenu'
import React, { useState, useRef, useCallback } from 'react'
import { Anchor, MarkdownRef } from '@/components/Markdown'
import './index.scss'
function removeActiveClassName() {
  document.querySelectorAll('a[href*="#title_anchor_"]').forEach(ele => ele.classList.remove('active'))
}
function addActiveClassName(id: string) {
  const selector = `a[href*="#${id}"]`
  document.querySelector(selector)?.classList.add('active')
}
function findNearestNode(elements: HTMLHeadingElement[]): null | HTMLHeadingElement {
  let nearestNode: null | HTMLHeadingElement = null
  elements.forEach(ele => {
    if (!nearestNode) {
      nearestNode = ele
    }
    if (Math.abs(nearestNode.getBoundingClientRect().top) > Math.abs(ele.getBoundingClientRect().top)) {
      nearestNode = ele
    }
  })
  return nearestNode
}
type Props = {
  markdwonFileName?: string | null
  path?: string
}
function MarkdownFlex(props: Props) {
  let titles: HTMLHeadingElement[] = []
  const [anchors, setAnchors] = useState<Anchor[]>([])

  const markdownRef = useRef<MarkdownRef>()
  const complete = useCallback((anchorArr: Anchor[]) => {
    setAnchors(anchorArr)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const nearestNode = findNearestNode(titles)
        if (nearestNode === null) return
        removeActiveClassName()
        addActiveClassName(nearestNode.getAttribute('id') ?? '')
      })
    })
    if (markdownRef.current?.markdownContainer) {
      titles = Array.from(markdownRef.current?.markdownContainer.querySelectorAll('*[id*="title_anchor_"]'))
      titles.forEach(title => {
        observer.observe(title)
      })
    }
  }, [])
  return <div className='Markdown_flex'>
        <div className='card left'>
          <AnchorsMenu anchors={anchors}></AnchorsMenu>
        </div>
        <div className='card right'>
          <MarkdownFile {...props} ref={markdownRef} complete={complete}></MarkdownFile>
        </div>
    </div>
}
export default MarkdownFlex