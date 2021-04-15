import { useRouter } from 'next/router';
import { Image, StructuredText } from "react-datocms";
import Link from 'next/link';
import { getSubject, getAllSubjects, getAllCourses } from '../api/dato';
import styles from '../../styles/Home.module.css';

const Subject = ({ subject, courses }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className={styles.main}>
      {subject.subjectImage  &&
        <Image
          data={subject.subjectImage.responsiveImage}
          />
      }
    
      <div className={styles.card}>
        <h1 className={styles.title}>
          {subject.subjectName}
        </h1>
        </div>
      <div className={styles.card}>
        <h3>Summary</h3>
        <p>{subject.subjectSummary}</p>
      </div>

      <div className={styles.card}>
        <h3>Courses</h3>
        <div className={styles.displayFlex}>
          {courses.map((c) => {
            return(
              <Link as={`/courses/${c.url}`} href="/courses/[c.url]">
                
                  <a className={`${styles.card} ${styles.cardLink}`}>
                    <p>{c.courseTitle}</p>
                    {c.courseImage ?
                        <Image
                        data={c.courseImage.responsiveImage}
                        />
                    : null}
                  </a>
                  {/* <p>{c.courseSummary}</p> */}
              </Link>
            )
          })}
        </div>
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
      </div>
    </main>
  )
}

export default Subject

export async function getStaticProps({ params, preview = false }) {
  const subject = await getSubject(params.url, preview);
  const courses = await getAllCourses();
  
  const pageValues = await Promise.all([subject, courses]);
  const subjectCourses = pageValues[1].filter((c) => {
    return c.subject[0].url === subject.url
  });

  // const subjectCourses = pageValues[1].map((element) => {
  //   console.log(element)
  //   return {...element, subElements: element.subject.filter((subElement) => subElement.url === subject.url)}
  // })

  return {
    props: {
      subject: pageValues[0],
      courses: subjectCourses,
    }
  }
}

export async function getStaticPaths() {
  const allSubjects = await getAllSubjects()
  return {
    paths: allSubjects?.map((subject) => `/subjects/${subject.url}`) || [],
    fallback: true,
  }
}