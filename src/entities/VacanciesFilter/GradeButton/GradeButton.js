import React, { useState } from 'react';
import useStyles from './GradeButton.styles';

const GradeButton = ({ buttonTitle, icon: Icon, onGradeClick, isSelected }) => {
  const classes = useStyles({ isSelected });

  const handleClick = () => {
    onGradeClick(buttonTitle);
    console.log('click');
  };

  return (
    <div className={classes.wrapper} onClick={handleClick}>
      <Icon width="20" height="26" />
      <div className={classes.buttonTitle}>{buttonTitle}</div>
    </div>
  );
};

export default GradeButton;
