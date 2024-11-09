import Header from '@/components/header'
import { client } from '@/libs/client'
import { defaultStyles } from '@/util/defaultStyles';

export default async function Home() {
  const data = await client.get({
    endpoint: "blogs"
  })
  
  return (
    <>
      <div className='flex flex-row-reverse justify-between px-[50px]'>
        <div className=''>
          <Header />
          <main className='px-[100px]'>
            <div className=''>
              <div className='h-[2000px]'>
                <h1 className={`${defaultStyles.text}`}>Maiami is a frontend and mobile app developer</h1>
                <h2 className={`${defaultStyles.text}`}>About this site</h2>
                <p className={`${defaultStyles.text}`}>This site is Maiami&apos;s portfolio site. I compile my past work history and the technology I use. I would like to send out a lot of information so that I can try new things.</p>
                <h2 className={`${defaultStyles.text}`}>About me</h2>
                <p className={`${defaultStyles.text}`}>Engineer born and raised in Tokyo.After graduating from the Department of Information Engineering, he got a job at a web production company and worked as a front-end and mobile application engineer.</p>
                <h2 className={`${defaultStyles.text}`}>Skill</h2>
              </div>
            </div>
          </main>
        </div>
        <aside className='sticky top-[10px] h-[300px] border-2 border-black w-[300px]'>
          <span className={`${defaultStyles.text}`}>Maiami</span>
          <p className={`${defaultStyles.text}`}>About me</p>
          <p className={`${defaultStyles.text}`}>Frontend and Mobile developer from Tokyo.</p>
          <p className={`${defaultStyles.text}`}>Who is this icon?</p>
          <p className={`${defaultStyles.text}`}>She is a character from the manga Jormungandr called Dr. Maiami.It&apos;s my favorite character.This site is designed with her favorite butterfly in mind.</p>
        </aside>
      </div>
    </>
  );
}