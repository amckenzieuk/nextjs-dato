import { GraphQLClient } from "graphql-request";

const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
  srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
    }
  });
  return client.request(query, variables);
}

export async function getAllCourses() {
  const data = await request({
    query: `query getAllCourses {
      allUgCourses {
        id
        courseTitle
        courseSummary
        courseImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
        url
        subject {
          url
        }

      }
    }
    ${responsiveImageFragment}`,
  });
  return data?.allUgCourses;
}

export async function getCourse(url) {
  const data = await request({
    query: `query courseByURL($url: String) {
      ugCourse(filter: {url: {eq: $url}}) {
        courseStructure {
          value
        }
        courseOverview {
          value
        }
        courseTitle
        courseSummary
        courseImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
        gcseProfile {
          grade
          fullDetails
          title
          qualification
        }
        languageProfile {
          profile
          profileRequirement(markdown: true)
          profileDetails
        }
        subject {
          subjectName
          subjectImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          url
        }
      }
    }
    ${responsiveImageFragment}`,
    variables: { url }
  });
  return data?.ugCourse;
}


export async function getAllSubjects() {
  const data = await request({
    query: `query getAllSubjects {
      allSubjects {
        id
        subjectName
        subjectSummary
        url
      }
    }`,
    variables: { limit: 10 }
  });
  return data?.allSubjects;
}

export async function getSubject(url) {
  const data = await request({
    query: `query SubjectByURL($url: String) {
      subject(filter: {url: {eq: $url}}) {
        courseStructure {
          value
        }
        careerProspects {
          value
        }
        subjectOverview {
          value
        }
        subjectName
        subjectSummary
        subjectImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
            ...responsiveImageFragment
          }
        }
        url
      }
    }
    ${responsiveImageFragment}`,
    variables: { url }
  });
  return data?.subject;
}

// export async function getSubjectCourses(url) {
//   const data = await request({
//     query: `query getSubjectCourses($url: String) {
//       allUgCourses(
//         filter: {
//             subject: {
//               url: eq: $url
//             }
//           }
//         ) {
//         courseTitle
//         courseSummary
//         courseImage {
//           responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
//             ...responsiveImageFragment
//           }
//         }
//       }
//     }
//     ${responsiveImageFragment}`,
//     variables: { url }
//   });
//   return data?.allUgCourses;
// }
