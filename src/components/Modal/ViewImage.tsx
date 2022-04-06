import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image as ChakraImage,
  Link,
  Button,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

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
  const [imgWidth, setImgWidth] = useState(600);

  const initialRef = useRef();
  const widthRef = useRef<HTMLImageElement>();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setImgWidth(600)
      }}
      isCentered
      initialFocusRef={initialRef} // focusing on close button
    >
      <ModalOverlay />
        
        <ModalContent
          maxHeight="600px"
          maxWidth="900px"
          w={imgWidth}
          m="0"
          p="0"
          alignItems="center"
          justifyContent="center"
          background="transparent"
        >
          <ModalBody
            background="pGray.900"
            alignItems="center"
            m="0"
            p="0"
            borderRadius="10px 10px 0 0"
            onLoad={({ target: divv }) => {
              const { clientWidth } = divv as HTMLDivElement;
              setImgWidth(clientWidth)
            }}
          >
            <ChakraImage 
              src={imgUrl} 
              objectFit='cover'
              maxHeight="600px"
              maxWidth="900px"
              m="0"
              p="0"
              borderRadius="4px 4px 0 0"              
              ref={widthRef}
            />
          </ModalBody>
          
          <ModalFooter
            background="pGray.900"
            w="100%"
            borderRadius="0 0 4px 4px"
            justifyContent="space-between"
            color="pGray.50"
            m="0"
            py="4"
            px="4"
          >
            <Link href={imgUrl} _hover={{ textDecoration: "none" }} isExternal>
              Abrir original
            </Link>

            <Button onClick={onClose} h="8" w="8" ref={initialRef} _focus={{ outline: "none" }}>X</Button>
          </ModalFooter>

        </ModalContent>
    </Modal>
  )
}
