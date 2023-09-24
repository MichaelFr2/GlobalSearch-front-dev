import React, { useState, useEffect } from 'react'
import useStyles from './VacanciesFilter.styles'
import GradeButton from './GradeButton/GradeButton'
import MiddleIcon from '../../shared/icons/MiddleIcon'
import JuniorIcon from '../../shared/icons/JuniorIcon'
import SeniorIcon from '../../shared/icons/SeniorIcon'
import BottomArrow from '../../shared/icons/BottomArrow'

const VacanciesFilter = ({ setOccupationFilter, setCountryFilter, setSpecializationFilter, setGradeFilter, initialFilters, setSearchFieldCounter, searchFieldCounter, setSearchTextChanged }) => {
    const classes = useStyles()

    const [occupation, setOccupation] = useState(initialFilters.occupationFilter);
    const [country, setCountry] = useState(initialFilters.countryFilter);
    const [specialization, setSpecialization] = useState(initialFilters.specializationFilter);
    const [selectedGrades, setSelectedGrades] = useState(initialFilters.gradeFilter);

    const handleOccupationChange = (event) => {
        setOccupation(event.target.value);
        setOccupationFilter(event.target.value);
    }
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        setCountryFilter(event.target.value);
    }
    const handleSpecializationChange = (event) => {
        setSpecialization(event.target.value);
        setSpecializationFilter(event.target.value);
    }
    const handleGradeClick = (grade) => {
        setSelectedGrades((prevSelected) => {
          if (prevSelected.includes(grade)) {
            return prevSelected.filter((g) => g !== grade);
          } else {
            return [...prevSelected, grade];
          }
        });
    };

    useEffect(() => {
        setGradeFilter(selectedGrades);
        console.log('Updating grade filter with:', selectedGrades);
    }, [selectedGrades]);
    
    const executeFilters = () => {
        setSearchFieldCounter(!searchFieldCounter);
        setSearchTextChanged(true);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.blockName}>
                Фильтр
            </div>
            <div className={classes.specializationFilter}>
                <div className={classes.filterTitle}>Специализация</div>
                <div className={classes.selectWrapper}>
                    <select className={classes.filterSelect} onChange={handleSpecializationChange} value={specialization}>
                        <option value="developer">Developer</option>
                        <option value="analyst">Analyst</option>
                        <option value="qa">QA</option>
                        <option value="marketing">Marketing</option>
                        <option value="project manager">Project manager</option>
                        {/* <option value="Tech Manager">Tech manager</option> */}
                        {/* <option value="UI/UX designer">UI/UX</option> */}
                        <option value="devOps">DevOps</option>
                        <option value="no-matter">Любая</option>
                    </select>
                    <div className={classes.iconWrapper}>
                        <BottomArrow />
                    </div>
                </div>
            </div>
            <div className={classes.countryFilter}>
                <div className={classes.filterTitle}>Страна</div>
                <div className={classes.selectWrapper}>
                    <select className={classes.filterSelect} onChange={handleCountryChange} value={country}>
                        <option value="turkey">Турция</option>
                        {/* <option value="Serbia">Сербия</option> */}
                        <option value="russia">Россия</option>
                        <option value="no-matter">Любая</option>
                    </select>
                    <div className={classes.iconWrapper}>
                        <BottomArrow />
                    </div>
                </div>
            </div>
            <div className={classes.occupationFilter}>
                <div className={classes.filterTitle}>Занятость</div>
                <div className={classes.selectWrapper}>
                    <select className={classes.filterSelect} onChange={handleOccupationChange} value={occupation}>
                        <option value="удаленная">Удаленная</option>
                        <option value="office">В офисе</option>
                        <option value="no-matter">Любая</option>
                    </select>
                    <div className={classes.iconWrapper}>
                        <BottomArrow />
                    </div>
                </div>
            </div>
            <div className={classes.gradeFilter}>
                <div className={classes.filterTitle}>Грейд</div>
                <div className={classes.gradeWrapper}>
                <GradeButton
                    buttonTitle="junior"
                    icon={JuniorIcon}
                    isSelected={selectedGrades.includes('junior')}
                    onGradeClick={handleGradeClick}
                />
                <GradeButton
                    buttonTitle="middle"
                    icon={MiddleIcon}
                    isSelected={selectedGrades.includes('middle')}
                    onGradeClick={handleGradeClick}
                />
                <GradeButton
                    buttonTitle="senior"
                    icon={SeniorIcon}
                    isSelected={selectedGrades.includes('senior')}
                    onGradeClick={handleGradeClick}
                />
                </div>
            </div>
            <button onClick={executeFilters} className={classes.doneButton}>Поиск</button>
        </div>
    )
}

export default VacanciesFilter
