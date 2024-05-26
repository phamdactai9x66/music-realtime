import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type songType = {
  audio_url: string;
  description: string;
  image_song: string;
  name_authors: string;
  name_song: string;
} & looseObj;

const initialState: songType = {
  audio_url: "",
  description: "",
  image_song: "",
  name_authors: "",
  name_song: "",
};

export const counterSlice = createSlice({
  name: "APP/COUNTER",
  initialState,
  reducers: {
    triggerSong: (state, payload: PayloadAction<songType>) => {
      if (!payload.payload) return;

      return payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { triggerSong } = counterSlice.actions;

export default counterSlice.reducer;
