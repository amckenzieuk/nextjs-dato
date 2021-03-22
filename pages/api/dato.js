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

const HOMEPAGE_QUERY = `query MyQuery {
  allSubjects {
    id
    subjectName
    subjectSummary
    url
  }
}`;

export async function getAllSubjects() {
  const data = await request({
    query: HOMEPAGE_QUERY,
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
      }
    }
    ${responsiveImageFragment}`,
    variables: { url }
  });
  return data?.subject;
}
