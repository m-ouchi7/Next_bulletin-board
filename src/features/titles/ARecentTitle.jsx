'use client'
import Link from 'next/link'
import useFetch from '@/features/hooks/getAPI/useFetch'
import omitTime from "@/features/hooks/getTime/omitTime"

export default function ARecentTitle({ recentData }) {
  const comment_recent = useFetch(`/comments/title_id/${recentData.title_id}/recent`)
  let title = useFetch(`/titles/${recentData.title_id}`)
  let category = useFetch(`/categories/${recentData.category_id}`)
  let postUser = useFetch(`/users/title_id/${recentData.title_id}/user_name`)
  
  if (comment_recent.isLoading || title.isLoading || category.isLoading || postUser.isLoading) {
    return <p>Loading...</p>
  }
  if (comment_recent.error || title.error || category.error || postUser.error) {
    return <p>Error occurred.</p>
  }
  
  title = title.data[0]
  category = category.data[0]
  postUser = postUser.data[0].user_name

  // 更新年月日同じ場合は省略
  let dateSource
  if (comment_recent.data.length > 0) {
    dateSource = comment_recent.data[0].created_at
  } else {
    dateSource = title.created_at
  }
  const date = omitTime(dateSource)

  return (
    <>
      <Link href={{ pathname: `/SomeTitle/${recentData.title_id}`, query: {recentPost_userName: postUser}}} as={`/SomeTitle/${title.title_id}`}>
        {title.title_name}
      </Link>
      <Link
        href={`/SomeCategory/${category?.category_id ?? ''}`}
        className='ml-1 text-xs text-blue-600'
      >
        {category?.category_name ?? 'カテゴリ不明'}
      </Link>
      <div className='flex justify-between'>
        <p className='w-[90%] text-sm'>
          {title.outline ?? ''}
        </p>
          <span
            className='text-[0.7rem]'
          >最終更新：{date}
            {postUser}</span>
      </div>
    </>
  )
}
