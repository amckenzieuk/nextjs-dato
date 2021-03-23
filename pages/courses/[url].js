import { useRouter } from 'next/router';
import Link from 'next/link';
import { Image, StructuredText } from "react-datocms";
import { getCourse, getAllCourses} from '../api/dato';
import styles from '../../styles/Home.module.css'

const Course = ({ course }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  console.log(course.subject)
  return (
    <main className={styles.main}>
      {course.courseImage  &&
        <Image
          data={course.courseImage.responsiveImage}
          />
      }
    
      <div className={styles.card}>
        <h1 className={styles.title}>
          {course.courseTitle}
        </h1>
        </div>
      <div className={styles.card}>
        <h3>Summary</h3>
        <p>{course.courseSummary}</p>
      </div>
      <div className={styles.card}>
        <h3>Overview</h3>
        <StructuredText data={course.courseOverview} />
      </div>
      <div className={styles.card}>
        <h3>Subject</h3>
            {course.subject.map((s, l) => {
                return(
                    <Link as={`/subjects/${s.url}`} href="/subjects/[s.url]">
                        <a className={`styles.card styles.cardLink`}>
                        <p>{s.subjectName}</p>
                        {s.subjectImage ?
                            <Image
                            data={s.subjectImage.responsiveImage}
                            />
                        : null}
                        </a>
                    </Link>
                )
            })}
      </div>
    </main>
  )
}

export default Course

export async function getStaticProps({ params, preview = false }) {
  const course = await getCourse(params.url, preview)

  return {
    props: { course }
  }
}

export async function getStaticPaths() {
  const allCourses = await getAllCourses()
  return {
    paths: allCourses?.map((course) => `/courses/${course.url}`) || [],
    fallback: true,
  }
}