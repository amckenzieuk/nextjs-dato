import { useRouter } from 'next/router';
import { Image, StructuredText } from "react-datocms";
import { getCourse, getAllCourses} from '../api/dato';
import styles from '../../styles/Home.module.css'

const Course = ({ course }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

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
      {/* <div className={styles.card}>
        <h3>Summary</h3>
        <p>{subject.subjectSummary}</p>
      </div>
      <div className={styles.card}>
        <h3>Overview</h3>
        <StructuredText data={subject.subjectOverview} />
      </div>
      <div className={styles.card}>
        <h3>Structure</h3>
        <StructuredText data={subject.courseStructure} />
      </div>
      <div className={styles.card}>
        <h3>Career Prospects</h3>
        <StructuredText data={subject.careerProspects} />
      </div> */}
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