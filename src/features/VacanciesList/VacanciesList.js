import useStyles from './VacanciesList.styles'
import VacancyTemplate from '../../entities/VacancyTemplate/VacancyTemplate'
import React from 'react'

const VacanciesList = React.forwardRef(({
  occupationFilter, countryFilter, specializationFilter, gradeFilter, searchResults, searchText, page, searchTotal
}, ref) => {
  const classes = useStyles()
  const activeVacancies = searchResults
    .filter(vacancy => vacancy.isVacancy)
  return (
    <div className={classes.wrapper} ref={ref}>
      <div className={classes.headerWrapper}>
        <div className={classes.header}>Вакансии</div>
        <div className={classes.vacanciesCount}>Всего: {searchTotal}</div>
      </div>
      {activeVacancies.map((vacancy) => (
        <VacancyTemplate 
            key={vacancy._id} 
            vacancyData={vacancy} 
            filters={{ occupationFilter, countryFilter, specializationFilter, gradeFilter }} 
            searchText={searchText}
            searchResults={searchResults}
            page={page}
        /> 
      ))}  
    </div>
  )
})

export default VacanciesList
