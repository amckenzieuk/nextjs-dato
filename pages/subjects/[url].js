import { useRouter } from 'next/router'
import { Image, StructuredText } from "react-datocms";
import { getSubject, getAllSubjects } from '../api/dato';
import styles from '../../styles/Home.module.css'

const Subject = ({ subject }) => {
  const router = useRouter()
  const { url } = router.query
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
  const subject = await getSubject(params.url, preview)

  return {
    props: { subject }
  }
}

export async function getStaticPaths() {
  const allSubjects = await getAllSubjects()
  return {
    paths: allSubjects?.map((subject) => `/subjects/${subject.url}`) || [],
    fallback: true,
  }
}