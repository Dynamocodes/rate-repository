import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const singleRepository = useQuery(GET_REPOSITORY, {
    variables: {id: id},
    fetchPolicy: 'cache-and-network',
    // Other options
  })

  const repository = singleRepository.loading ? undefined : singleRepository.data.repository
  
  const loading = singleRepository.loading;


  return { repository, loading };
};

export default useRepository;