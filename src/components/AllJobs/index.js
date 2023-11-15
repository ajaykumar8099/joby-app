import {Component} from 'React'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import JobItem from '../JobItem'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  intital: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobStatusConstants = {
  intital: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const failureViewImg =
  'https://assets.ccbp.in/frontend/react-js/failure-img.png '

class Jobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    checkBoxInput: [],
    radioInput: '',
    searchInput: '',
    apiStatus: apiStatusConstants.intital,
    apiJobStatus: apiJobStatusConstants.intital,
  }

  componentDidMound() {
    this.onGetProfileDetails(), this.onGetJobDetails()
  }

  onGetProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkBoxInput, radioInput, searchInput} = this.state
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseProfile = await fetch(profileApiUrl, options)
    if (responseProfile.ok === true) {
      const fetchedData = await responseProfile.json()
      const updateProfile = fetchedData.map(each => ({
        name: each.profile_details.name,
        profileImgUrl: each.profile_details.profile_image_url,
        shortBio: each.profile_details.short_bio,
      }))
      this.setState({
        profileData: updateProfile,
        apiStatus: apiStatusConstants.success,
        responseSuccess: true,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGetProfileDetails = async () => {
    this.setaState({apiJobStatus: apiJobStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkBoxInput, radioInput, searchInput} = this.state
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInput}&minimum_package=${radioInput}&search=${searchInput}`
    const optionsJob = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobs = await fetch(jobApiUrl, optionsJob)
    if (responseJobs.ok === true) {
      const fetchedDataJobs = await responseJobs.json()
      const updateDataJobs = fetchedDataJobs.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
      }))
      this.setState({
        jobsData: updateDataJobs,
        apiJobStatus: apiJobStatusConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobStatusConstants.failure})
    }
  }

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.onGetJobDetails())
  }

  onGetInputOption = event => {
    const {checkBoxInput} = this.state
    const inputNotInList = checkBoxInput.filter(
      each => each === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prev => ({
          checkBoxInput: [...prev.checkBoxInput, event.target.id],
        }),
        this.onGetJobDetails,
      )
    } else {
      const filteredData = checkBoxInput.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        prev => ({checkBoxInput: filteredData}),
        this.onGetJobDetails,
      )
    }
  }

  onGetProfileView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImgUrl, shortBio} = profileData[0]
      return (
        <div>
          <img src={profileImgUrl} alt="profile" />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.onGetProfileDetails()
  }

  onGetProfileFailureView = () => (
    <div>
      <button type="button" onClick={this.onRetryProfile}>
        retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRenderProfileStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success():
        return this.onGetProfileView()
      case apiStatusConstants.failure():
        return this.onGetProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
    }
  }

  onRetryJobs = () => {
    this.onGetJobDetails()
  }

  onGetJobsFailureView = () => (
    <div>
      <img src={failureViewImg} alt="failure view" />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for</p>
      <div>
        <button type="button" onClick={this.onRetryJobs}>
          retry
        </button>
      </div>
    </div>
  )

  onGetJobView = () => {
    const {jobsData} = this.state
    const noJob = jobsData.length === 0
    return noJob ? (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other Filters.</p>
      </div>
    ) : (
      <ul>
        {jobsData.map(each => (
          <JobItem key={each.id} jobData={each} />
        ))}
      </ul>
    )
  }

  onRenderJobStatus = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiJobStatusConstants.success:
        return this.onGetJobView()
      case apiStatusConstants.failure:
        return this.onGetJobsFailureView()
      case apiJobStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onGetCheckBoxView = () => (
    <ul>
      {employmentTypesList.map(each => (
        <li key={each.id}>
          <input
            type="checkbox"
            id={each.id}
            onChange={this.onGetInputOption}
          />
          <label htmlFor={each.id}>{each.label}</label>
        </li>
      ))}
    </ul>
  )

  onGetRadioButtonView = () => (
    <ul>
      {salaryRangesList.map(each => (
        <li key={each.id}>
          <input
            type="radio"
            id={each.salaryRangeId}
            onChange={this.onGetRadioOption}
          />
          <label htmlFor={each.salaryRangeId}>{each.label}</label>
        </li>
      ))}
    </ul>
  )

  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.onGetJobDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'ENTER') {
      this.onGetJobDetails()
    }
  }

  render() {
    const {checkBoxInput, radioInput, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs">
          <div className="profile-container">
            {this.onRenderProfileStatus()}
            <hr />
            <h1>Type of Employment</h1>
            {this.onGetCheckBoxView()}
            <hr />
            <h1>Salary Range</h1>
            {this.onGetRadioButtonView()}
          </div>
          <div className="job-container">
            <div>
              <input
                type="search"
                className="user-input"
                placeholder="Search"
                onChange={this.onGetSearchInput}
                keydown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
                onClick={this.onSubmitSearchInput}
              >
                <AiOutlineSearch />
              </button>
            </div>
            {this.onRenderJobStatus()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
