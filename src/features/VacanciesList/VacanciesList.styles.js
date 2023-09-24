import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  wrapper: {
    paddingTop: '21px',
  },
  header: {
    color: '#333',
    fontSize: '24px',
    fontWeight: 600,
    marginLeft: '16px',
    marginBottom: '15px',
    marginRight: '25px',
  },
  vacanciesCount: {
    color: '#9D9D9D',
    fontSize: '15px',
    fontWeight: 400,
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'baseline',
  }
});

export default useStyles;
