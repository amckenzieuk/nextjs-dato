import { useRouter } from 'next/router';
import Link from 'next/link';
import { Image, StructuredText } from "react-datocms";
import ReactMarkdown from 'react-markdown';
import {render} from 'react-dom';
import gfm from 'remark-gfm';
import { getCourse, getAllCourses} from '../api/dato';
import styles from '../../styles/Home.module.css';

const Course = ({ course }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  console.log(course)
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
        <div className={styles.displayFlex}>
            {course.subject.map((s) => {
                return(
                    <Link as={`/subjects/${s.url}`} href="/subjects/[s.url]">
                        <a className={`${styles.card} ${styles.cardLink}`}>
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
      </div>
      <div className={styles.card}>
        <h3>Additional Requirements</h3>
        <h2>GCSE</h2>
        <ul>
          {course.gcseProfile.map((profile) => {
            return (
              <li>
                <b>{profile.qualification}</b><br/>
                {profile.title} <a href={profile.fullDetails}>Full Details</a>
              </li>
            )
          })}
        </ul>
        {/* <h2>English Language</h2>
        <ReactMarkdown
            source={course.languageProfile.profileRequirementprofileRequirement}
            escapeHtml={false} */}
        {/* /> */}
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