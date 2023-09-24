import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  wrapper: {
    paddingLeft: '16px',
    paddingRight: '16px',
    marginTop: '10px',
    position: 'sticky',
    top: '0',
    zIndex: 10,
    paddingTop: '19px',
    paddingBottom: '16px',
    backgroundColor: 'white',
  },
  searchField: {
    height: '40px',
    padding: '10px 34px',
    fontSize: '16px',
    borderRadius: '7px',
    border: '0px',
    backgroundColor: '#E8E8E8',
    outline: 'none',
    '&::placeholder': {
      color: '#828282',
      fontSize: '14px',
      fontWeight: 400,
    },
    zIndex: 2,
    '& input, & select': {
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      'appearance': 'none',
    },
    width: '100%',
  },
  '@media screen and (-webkit-min-device-pixel-ratio: 0)': {
    'select:focus, textarea:focus, input:focus': {
      fontSize: '16px', 
    }
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: '29px',
    transform: 'translateY(-40%)',
  },
});

export default useStyles;
