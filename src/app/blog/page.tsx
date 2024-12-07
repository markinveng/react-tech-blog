import Header from '@/components/header'
import { client } from '@/libs/client';

export default async function BlogPage() {
  const data = await client.get({
    endpoint: "blogs"
  });
  return (
    <>
      <Header />
      <main>
        <div>This is BlogPage</div>
        <div>Coming soon...</div>
      </main>
    </>
  );
}