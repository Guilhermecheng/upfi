import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image as ChakraImage,
  Link,
  ModalHeader,
  Button,
  Box
} from '@chakra-ui/react';
import { useState } from 'react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  const [imgWidth, setImgWidth] = useState(0);

  const imgg = new Image();
  imgg.src = imgUrl;

  imgg.onload = () => {
    setImgWidth(imgg.width);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      // size="lg"
    >
      <ModalOverlay />
        
        <ModalContent        
          w={imgWidth}
          maxHeight="600px"
          maxWidth="900px"
          m="0"
          p="0"
          alignItems="center"
          justifyContent="center"
        >
          <ModalBody
            background="pGray.900"
            alignItems="center"
            m="0"
            p="0"
            borderRadius="10px 10px 0 0"
          >
            <ChakraImage 
              src={imgUrl} 
              objectFit='cover'
              maxHeight="600px"
              maxWidth="900px"
              m="0"
              p="0"
              borderRadius="4px 4px 0 0"
            />
          </ModalBody>
          
          <ModalFooter
            background="red"
            w="100%"
            borderRadius="0 0 4px 4px"
            justifyContent="space-between"
          >
            <Link href={imgUrl}>
              <Box as="a">Abrir original</Box>
            </Link>

            <Button onClick={onClose}>X</Button>
          </ModalFooter>

        </ModalContent>
    </Modal>
  )
}
