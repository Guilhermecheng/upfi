import { Button, Box } from '@chakra-ui/react';
import { FormEvent, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
}

type Page = {
  data: Card;
  after: string | null;
}

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
    // request with axios
    async ({ pageParam = null }) => {
      try {
        const { data, status } = await api.get('images', {params: { after: pageParam }});
        console.log(status)

        return {
          data
        };
        
      } catch(err) {
        console.log(err)
      }
    }
    ,
    // return next page param
    {
      getNextPageParam: (lastPage , allPages) => {
        console.log(lastPage.data)
        return lastPage.data.after;
      }
    },
  );

  const formattedData = useMemo(() => {
    // return a flatten array to be used in card's list
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

  // render Loading screen while fetching
  if(isLoading) {
    return <Loading />
  }  

  // render error screen if error
  if(isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>        
        <CardList cards={formattedData} />

        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? (
            <Box
              mt="10"
            >
              <Button onClick={(e: FormEvent) => {
                e.preventDefault()
                fetchNextPage()
              }}>
                Carregar mais
              </Button>
            </Box>
          ) : ""
        }
      </Box>
    </>
  );
}
