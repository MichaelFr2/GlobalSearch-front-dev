import React from 'react'
import useStyles from './VacanciesSearchHeader.styles'
import VacanciesSearchGoose from '../../../shared/GooseImg/VacanciesSearchGoose'
import VacanciesSearchGrid from '../../../shared/GooseImg/VacanciesSearchGrid'
const VacanciesSearchHeader = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.gooseBlock}>
          <VacanciesSearchGoose />
        </div>
        <div className={classes.textBlock}>
          <div className={classes.mainText}>
          Настрой свой глобальный поиск вакансий!
          </div>
          {/* <div className={classes.additionalText}>
            Заполни анкету!
          </div> */}
        </div>
      </div>
      <div className={classes.gridBackground}>
          <VacanciesSearchGrid />
        </div>
    </>
  )
}

export default VacanciesSearchHeader