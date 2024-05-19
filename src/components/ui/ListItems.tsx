import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

type ListSongsProps = {
  data: looseObj[];
} & React.PropsWithChildren;

const useStyle = makeStyles((theme: Theme) => {
  return {
    container: {
      width: "100%",
      bgcolor: "background.paper",
      overflow: "auto",
      maxHeight: "calc(100vh - 200px)",
      paddingRight: theme.spacing(2),
    },
  };
});

const ListSongs: React.FC<ListSongsProps> = (props) => {
  const { data = [] } = props || {};

  const classes = useStyle();

  return (
    <List className={classes.container}>
      {data.map((data, index) => {
        const {
          audio_url,
          description,
          image_song,
          name_authors,
          name_song,
          _id,
        } = data;
        return (
          <Box key={_id}>
            <ListItem alignItems="flex-start">
              {/* image song */}
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={image_song || ""} />
              </ListItemAvatar>

              {/* content item */}
              <ListItemText
                primary={name_song}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {name_authors || "--"}
                    </Typography>
                    {description}
                  </React.Fragment>
                }
              />
            </ListItem>

            {/* don't display divider when is last item */}
            {data.length == index ? null : (
              <Divider variant="inset" component="li" />
            )}
          </Box>
        );
      })}
    </List>
  );
};

export default ListSongs;
