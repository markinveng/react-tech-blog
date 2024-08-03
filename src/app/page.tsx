import { client } from '@/libs/client'

export default async function Home() {
  const data = await client.get({
    endpoint: "blogs"
  })
  console.log(data.contents[0].content);
  
  return (
    <main>
      <p>{data.contents[0].content}</p>
    </main>
  );
}