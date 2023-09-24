import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  wrapper: ({ isSelected }) => ({
    minWidth: '100px',
    display: 'flex',
    width: '100px',
    height: '34px',
    padding: '2px 11px 4px 4px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '13px',
    flexShrink: 0,
    borderRadius: '25px',
    flexGrow: 1,
    maxWidth: '300px',
    color: isSelected ? '#fff' : '#6B6B6B',
    backgroundColor: isSelected ? '#FA631C' : '#F3F3F3',
  }),


  icon: {
    width: '20px',
    height: '26px',
  },
});

export default useStyles;
