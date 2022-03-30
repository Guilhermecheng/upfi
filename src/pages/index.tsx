import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { postAPI } from './api/try';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['images'],
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam = 1 }) => {
      try {
        const { data, status } = await api.get('images');
        console.log(status)

        return {
          data
        };
        
      } catch(err) {
        console.log(err)
      }
    }
    ,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (lastPage , allPages) => {
        console.log(lastPage.data)
        return lastPage.data.after;
      }
    },
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    if(data) {
      let formattedPages = [];
      data.pages.forEach((page) => {
        page.data.data.forEach((pgItem) => {
          const formatData = {
            title: pgItem.title,
            description: pgItem.description,
            url: pgItem.url,
            ts: pgItem.ts,
            id: pgItem.id,
          }
  
          formattedPages.push(formatData)
        })
      })

      return formattedPages;
    } else {
      return null;
    }
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>        
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        <Button onClick={() => postAPI()} my="8">oi</Button>

        <Box>
          <Button>Carregar mais</Button>
        </Box>
      </Box>
    </>
  );
}
