import ProfileDetails from '../ProfileDetails'
import {BsSearch} from 'react-icons/bs'

import './index.css'

const FilterGroup = props => {
  const onChangeSearchInput = event => {
    const {ChangeSearchInput} = props
    ChangeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'ENTER') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div>
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button type="button" id="searchButton" onClick={getJobs}>
          <BsSearch />
        </button>
      </div>
    )
  }
  const renderTypeOfEmployment = () => {
    const {employmentTypeList} = props
    return (
      <div>
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypeList.map(each => {
            const {changeEmployeeList} = props
            const onSelectEmployeeType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li key={each.employmentTypeId} onChange={onSelectEmployeeType}>
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  value={each.employmentTypeId}
                />
                <lable htmlFor={each.employmentTypeId}>{each.label}</lable>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div>
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(each => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(each.salaryRangeId)
            }
            return (
              <li key={each.salaryRangeId} onClick={onClickSalary}>
                <input type="radio" id={each.salaryRangeId} name="salary" />
                <lable htmlFor={each.salaryRangeId}>{each.label}</lable>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {renderSearchInput()}
      <ProfileDetails />
      <hr />
      {renderTypeOfEmployment()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroup
