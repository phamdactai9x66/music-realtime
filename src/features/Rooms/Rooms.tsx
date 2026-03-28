import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Fab, debounce } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { orderByChild, startAfter } from 'firebase/database';

import { RoomsUrl } from 'src/apis/request';
import FormCreateRoom from 'src/components/ui/FormCreateRoom';
import { useStreaming } from 'src/hook';
import { LIST_EVENT, publish } from 'src/service/event';
import httpRequest from 'src/service/httpRequest';

import ListRooms from './Components/ListRooms';



type RoomsProps = object & React.PropsWithChildren;

const Rooms: React.FC<RoomsProps> = () => {
  useStreaming({
    url: RoomsUrl(),
    callBack: () => {
      // snapshot, realtime when data change
      handleApiRooms();
    },
  });

  const [Rooms, setRooms] = React.useState<looseObj[]>([]);

  const handleApiRooms = async (...query: unknown[]) => {
    try {
      const getData = await httpRequest.getData(RoomsUrl(), ...query);

      setRooms(getData);
    } catch (error) {
      console.log(error);
    }
  };

  const onsearchRoom = debounce(
    async (val: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = val.target.value;

      if (inputValue) {
        return await handleApiRooms(
          orderByChild('name_room'),
          startAfter(inputValue, 'name_room'),
        );
      }

      handleApiRooms();
    },
    import.meta.env.VITE_TIME_SEARCH,
  );

  /**
   * handle create room
   */
  const handleModalCreateForm = () => {
    publish(LIST_EVENT.MODAL_GLOBAL, {
      Component: FormCreateRoom,
      ComponentProps: {},
    });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Search Room</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          onChange={onsearchRoom}
          label="Search Rooms"
        />
      </FormControl>

      <ListRooms listRoomData={Rooms} />

      <Fab
        sx={{
          position: 'absolute',
          bottom: 20,
          right: '45%',
          fontSize: '2rem',
          outline: 'none',
          ':focus': {
            outline: 'none !important',
          },
        }}
        aria-label={'Add'}
        onClick={handleModalCreateForm}
        color={'primary'}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Rooms;
