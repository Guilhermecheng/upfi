import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

type ImageProps = {
  title: string | unknown;
  description: string | unknown;
  url: string;
}

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: "Arquivo obrigatório",
      validate: {
        lessThan10MB: async (file: File) => {
          console.log(file[0].size)
          if(file[0].size < 10000 * 1024) {
            return true
          } else {
            return 'O arquivo deve ser menor que 10MB' 
          }
        },
        acceptedFormats: (file: File) => {
          const type = file[0].type;
          const [fileType, fileFormat] = type.split('/');
          console.log(fileFormat)
          const regex = /(gif|jpe?g|png)$/i;
          // if (fileType !== 'image') return "Somente são aceitos arquivos PNG, JPEG e GIF";
          console.log(regex.test(fileFormat))
          if(regex.test(fileFormat)) {
            return true;
          } else {
            return "Somente são aceitos arquivos PNG, JPEG e GIF"
          }
        },
      }
    },
    title: {
      required: "Título obrigatório",
      minLength: {
        value: 2,
        message: "Mínimo de 2 caracteres",
      },
      maxLength: {
        value: 20,
        message: "Máximo de 20 caracteres"
      },
    },
    description: {
      required: "Descrição obrigatória",
      maxLength: {
        value: 65,
        message: "Máximo de 65 caracteres"
      }
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    async (data: ImageProps) => {
      await api.post('/images', data)
    },
    {
      // TODO ONSUCCESS MUTATION
      onSuccess: () => queryClient.invalidateQueries('images')
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState,
    setError,
    trigger,
  } = useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXIST
        if(!imageUrl) {
          toast({
            title: 'Imagem não adicionada',
            description: "É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }

        const { title, description } = data;
        const imageUpload = {
          title,
          description,
          url: imageUrl,
        }
      // TODO EXECUTE ASYNC MUTATION
      await mutation.mutateAsync(imageUpload)
      // TODO SHOW SUCCESS TOAST
      toast({
        title: 'Imagem cadastrada',
        description: "Sua imagem foi cadastrada com sucesso.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (err) {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      console.log(err)
      toast({
        title: 'Falha no cadastro',
        description: "Ocorreu um erro ao tentar cadastrar sua imagem.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={ errors?.image && errors.image }
          {...register("image", formValidations.image)}

        />

        <TextInput
          placeholder="Título da imagem..."
          error={ errors?.title && errors.title }
          {...register("title", formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          error={ errors?.description && errors.description }
          {...register("description", formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
