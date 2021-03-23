import { getAllCourses, getAllSubjects } from "./api/dato";
import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'


// export default function Home({ data }) {
//   return <div>{JSON.stringify(data, null, 2)}</div>;
// }

export async function getStaticProps({ preview = false }) {
  const allSubjects = (await getAllSubjects(preview)) || []
  const allCourses = (await getAllCourses(preview)) || []
  return {
    props: { allSubjects, allCourses },
  }
}

export default function Home({ allSubjects, allCourses }) {
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
        
        <h2>
          Browse subjects:
        </h2>

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
        <h2>
          Browse courses:
        </h2>

        <div className={styles.grid}>
          {allCourses.map((course, i) => (
            <Link as={`/courses/${course.url}`} href="/courses/[course.url]">
              <a className={`styles.card styles.cardLink`}>
                <h3>{course.courseTitle}</h3>
                <p>{course.courseSummary}</p>
              </a>
          </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
