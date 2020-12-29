import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Page() {
  const router = useRouter()

  useEffect(() => {
    // Always do navigations after the first render
    router.push('/test/jobs', undefined, { shallow: true })
  }, [])

  return null;
}

export default Page;
