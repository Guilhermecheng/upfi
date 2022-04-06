import { Grid, GridItem, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalImage, setModalImage] = useState("");
  console.log("isOpen: " + isOpen)

  function handleViewImage(url: string) {
    onOpen()
    setModalImage(url)
  }

  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap="8"
      >
        { cards && (
          cards.map((card) => {
            console.log(card)
            return (
              <GridItem key={ card.id }>
                <Card 
                  data={ card } 
                  viewImage={ (url) => handleViewImage(url) } 
                />
              </GridItem>
            )
          }) 
        ) }

      </Grid>

      <ModalViewImage 
        isOpen={isOpen}
        onClose={onClose}
        imgUrl={modalImage}
      />
    </>
  );
}
