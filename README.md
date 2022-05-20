# upfi

Simple image repository app, where you can upload, and see your images!
<br/>
Project to better understand and practice API usage in React Project. Project uses faunadb API, and imgbb as image repository.</br></br>

![image](https://user-images.githubusercontent.com/62719629/169200856-627f507e-28bb-4d1b-90d1-36a0267db858.png)
</br></br>

## Functionalities

User can open each image, open its original page, in original size, and load new images in the site

<div style="display: flex;">
  <img src="https://media.giphy.com/media/9wrdy6Mvr7U99hpFaG/giphy.gif" />&nbsp;&nbsp;&nbsp;
  <img src="https://media.giphy.com/media/f5JHkg5a4VydU8x5UN/giphy.gif" />
</div>


## Using infinite queries

To load image list from fauna db, useInfiniteQuery from react-query package was used. To activate page load, a "Load more" button was used, at the end of image list. When clicking it, fetchNextPage is called. Although in this project was used as a button activation, it can also be used as infinite scroll.

More info at: https://react-query.tanstack.com/guides/infinite-queries

**In index.tsx:** </br>

```javascript
import { useInfiniteQuery } from 'react-query';

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
        const { data, status } = await api.get('images', {params: { after: pageParam }});
        return {
          data
        };
    }
    ,
    // return next page param
    {
      getNextPageParam: (lastPage , allPages) => {
        return lastPage.data.after;
      }
    },
  );
```
