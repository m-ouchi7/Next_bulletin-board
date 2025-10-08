import Link from 'next/link'
import useFetch from '@/features/hooks/getAPI/useFetch'
import useOmitTimeFunc from "@/features/hooks/getTime/omitTime"
import RecentPostUser from "@/features/users/RecentPostUser"

export default function ATitle({ title, category }) {
  const comment_recent = useFetch(`/comments/title_id/${title.title_id}/recent`)
  const postUser = useFetch(`/users/${title.user_id}/user_name`)
  let categoryD

  if (typeof category !== 'number') {
    categoryD = category

    if (comment_recent.isLoading || categoryD.isLoading || postUser.isLoading) {
      return <p>Loading...</p>
    }
    if (comment_recent.error || categoryD.error || postUser.error) {
      return <p>Error occurred.</p>
    }
  }

  // 更新年月日同じ場合は省略
  let date
  if (comment_recent.data.length > 0) {
    date = useOmitTimeFunc(comment_recent.data[0].created_at)
  } else {
    date = useOmitTimeFunc(title.created_at)
  }

  let recentPostUserId = comment_recent.data.user_id

  return (
    <>
      <Link href={{ pathname: `/SomeTitle/${title.title_id}`, query: {recentPost_userName: postUser.data[0].user_name}}} as={`/SomeTitle/${title.title_id}`}>
        {title.title_name}
      </Link>
      <Link
        href={`/SomeCategory/${categoryD.category_id}`}
        className='ml-1 text-xs text-blue-600'
      >
        {categoryD.category_name}
      </Link>
      <div className='flex justify-between'>
        <p className='w-[90%] text-sm'>
          {title.outline}
        </p>
          <span
            className='text-[0.7rem]'
        >最終更新：{date}
          <RecentPostUser
            resistUser={postUser.data[0].user_name}
            recentPostUserId={recentPostUserId}
          />
        </span>
      </div>
    </>
  )
}
