import { getAllSubjects } from "./api/dato";
import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'


// export default function Home({ data }) {
//   return <div>{JSON.stringify(data, null, 2)}</div>;
// }

export async function getStaticProps({ preview = false }) {
  const allSubjects = (await getAllSubjects(preview)) || []
  return {
    props: { allSubjects },
  }
}

export default function Home({ allSubjects }) {
  console.log(allSubjects);
  return (
  
    <div className={styles.container}>
      <Head>
        <title>UoB Subjects</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          University of Bristol
        </h1>
        
        <p className={styles.description}>
          Browse subjects:
        </p>

        <div className={styles.grid}>
          {allSubjects.map((subject, i) => (
            <Link as={`/subjects/${subject.url}`} href="/subjects/[subject.url]">
              <a className={`styles.card styles.cardLink`}>
                <h3>{subject.subjectName}</h3>
                <p>{subject.subjectSummary}</p>
              </a>
          </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
