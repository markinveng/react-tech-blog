import Header from '@/components/header'
import { client } from '@/libs/client'

export default async function Home() {
  const data = await client.get({
    endpoint: "blogs"
  })

  return (
    <>
      <Header />
      <main>
        Coming Soon...
        {/* <p>{data.contents[0].content}</p> */}
      </main>
    </>
  );
}