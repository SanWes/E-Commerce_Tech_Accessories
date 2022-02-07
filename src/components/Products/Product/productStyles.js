import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    root: {
        maxWidth: '100%',
        maxHeight: '100%',

    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      bottom: '0'
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
}));