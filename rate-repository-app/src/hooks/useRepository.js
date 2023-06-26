import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const singleRepository = useQuery(GET_REPOSITORY, {
    variables: {id: id},
    fetchPolicy: 'cache-and-network',
    // Other options
  })

  const repository = singleRepository.loading ? {ownerAvatarUrl: "https://avatars.githubusercontent.com/u/4060187?v=4"} : singleRepository.data.repository
  
  const loading = singleRepository.loading;


  return { repository, loading };
};

export default useRepository;