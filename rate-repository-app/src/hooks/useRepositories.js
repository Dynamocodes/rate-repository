import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedSort) => {
  let orderBy, orderDirection;

  switch (selectedSort) {
    case 'latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
    case 'highest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    default:
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
  }

  const allRepositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection }, // pass the variables to the query
  })

  const repositories = allRepositories.loading ? undefined : allRepositories.data.repositories
  
  const loading = allRepositories.loading;

  return { repositories, loading };
};

export default useRepositories;
