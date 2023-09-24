import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './VacancyDetailed.styles'
import ReturnArrow from '../../shared/icons/ReturnArrow';
function applyHighlightsToText(text, highlights) {
  let modifiedText = text;

  highlights.forEach((highlight) => {
      const plainText = highlight.replace(/<\/?em>/g, "");
      
      modifiedText = modifiedText.replace(plainText, highlight);
  });

  return modifiedText;
}
const VacancyDetailed = () => {
  const location = useLocation();
  const { vacancyData, filters, searchText, page, searchResults, currentScrollY } = location.state;
  const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const renderVacancyText = () => {
    if (vacancyData.highlight && vacancyData.highlight.vacancyText) {
      return applyHighlightsToText(vacancyData.vacancyText, vacancyData.highlight.vacancyText);
    } else {
      return vacancyData.vacancyText;
    }
  }
  if (!vacancyData) {
    return <div>No data available</div>;
  }
    const renderOccupationType = () => {
    if(Array.isArray(vacancyData.occupationType)) {
      if(vacancyData.occupationType[0] !== 'not_mentioned') {
        return <div className={classes.filter}>{vacancyData.occupationType.join(', ')}</div>;
      }
    } else if(vacancyData.occupationType !== 'not_mentioned') {
      return <div className={classes.filter}>{vacancyData.occupationType}</div>;
    }
    }
  console.log(vacancyData)
  return (
    <>
        <div className={classes.wrapper}>
            <button className={classes.returnButton}  onClick={() => navigate('/vacancies', { state: {filters, searchText, page, searchResults, currentScrollY} })}> <ReturnArrow /> Назад </button>
            <div className={classes.headerTemplate}>
                <div className={classes.companyName}>
                    {vacancyData.companyName === 'not_mentioned' ? '' : vacancyData.companyName}
                </div>
                <div className={classes.vacancyName}>
                    {vacancyData.vacancyName}
                </div>
                <div className={classes.filters}>
                    {vacancyData.grade !== 'not_mentioned' && <div className={classes.filter}>{vacancyData.grade}</div>}
                    {vacancyData.country !== 'not_mentioned' && <div className={classes.filter}>{vacancyData.country}</div>}
                    {renderOccupationType()}
                </div>
            </div>
            <div className={classes.salaryWrapper}>
                {vacancyData.salary === 'not_mentioned' ? 'Зарплата по итогам собеседования' : vacancyData.salary+' '} 
                {vacancyData.salaryCurrency === 'not_mentioned' ? '' : vacancyData.salaryCurrency}            </div>
                <div className={classes.vacancyBody} dangerouslySetInnerHTML={{ __html: renderVacancyText().split('\n').join('<br/>') }}>
            </div>
            <div className={classes.dataBlock}>
                {vacancyData.date}                     
            </div>
            <button className={classes.doneButton}>Откликнуться</button>
        </div>
    </>
  )
}

export default VacancyDetailed
