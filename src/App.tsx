import { useCallback, useRef } from 'react'
import { useGetPostsQuery } from './services/redux/api'
import { Card, Divider, Tag } from 'antd'
import Meta from 'antd/es/card/Meta'
import { LikeOutlined } from '@ant-design/icons'
import Paragraph from 'antd/es/typography/Paragraph'

function App() {
  const total = useRef(0)
  const observer = useRef<IntersectionObserver | null>(null)

  const { data, refetch, isError, isFetching, isLoading } = useGetPostsQuery(total.current)

  const bottom = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    if (isFetching) return;
    if (!data) return;
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && data?.posts.length < data?.total) {
        refetch()
      }
    });

    observer.current.observe(node)

  }, [isFetching, refetch])

  if (isLoading) return 'Loading...'
  if (isError) return 'Error'
  
  total.current = data?.posts.length || 0


  return (
    <>
      {data && data.posts.map((post, index, posts) => 
        <Card 
          ref={posts.length - 2 === index ? bottom : null} 
          key={post.id}
          actions={[
            <span>{post.reactions} <LikeOutlined /></span>
          ]}
        >
          <Meta 
            title={post.title} 
            description={<Paragraph ellipsis={{rows: 3}}>{post.body}</Paragraph>} 
          />
          <Divider />
          {post.tags && post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </Card>  
      )}
      {isFetching && <Paragraph style={{textAlign: 'center'}}>Loading...</Paragraph>}
    </>
  )
}

export default App
