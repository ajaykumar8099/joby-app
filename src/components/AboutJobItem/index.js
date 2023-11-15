import {Component} from 'react'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    jobDataDetails: [],
    similarJobData: [],
    apiStatus: apiStatusContants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusContants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updateData = [fetchedData.job_details].map(each => ({
        companyLogoUrl: each.comapnay_logo_url,
        companyWebsiteUrl: each.company_webSite_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        skills: each.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: each.title,
      }))

      const updatedSimilarJobDetails = fetchedData.similar_jobs.map(each => ({
        companyLogoUrl: each.comapnay_logo_url,
        id: each.id,
        jobDescription: each.job_description,
        employmentType: each.employment_type,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDataDetails: updateData,
        similarJobData: updatedSimilarJobDetails,
        apiStatus: apiStatusContants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusContants.failure,
      })
    }
  }

  renderJobDetailsSucessView = () => {
    const {jobDataDetails, similarJobData} = this.state
    if (jobDataDetails.length >= 1) {
      const {
        companyLogoUrl,
        employmentType,
        companyWebsiteUrl,
        jobDescription,
        packagePerAnnum,
        location,
        id,
        skills,
        lifeAtCompany,
        title,
        rating,
      } = jobDataDetails[0]
      return (
        <>
          <div className="job-item-container">
            <div className="first-part-container">
              <div className="img-title-container">
                <img src={companyLogoUrl} alt="job details company logo" />
                <div className="title-rating-cont">
                  <h1 className="title-head">{title}</h1>
                  <div className="star-rating-cont">
                    <AiFillStar className="star-icon" />
                    <p className="rating-text">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-package-cont">
                <div className="location-job-type">
                  <div className="locatoin-item-cont">
                    <MdLocationOn className="location-icon" />
                    <p className="location-para">{location}</p>
                  </div>
                  <div className="employement-type-loca-cont">
                    <p className="job-type">{employmentType}</p>
                  </div>
                </div>
                <div className="pack-cont">
                  <p className="pak">{packagePerAnnum}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="seconsd-p-cont">
              <div className="description-visit-cont">
                <h1 className="description">{description}</h1>
                <a className="visit-logo" href={companyWebsiteUrl}>
                  VISIT <BiLinkExternal />
                </a>
              </div>
              <p className="desc-par">{jobDescription}</p>
            </div>
            <h1>Skills</h1>
            <ul className="ul-job-cont">
              {skills.map(each => (
                <li className="li-job-desc" key={each.name}>
                  <img src={each.imageUrl} alt={each.name} />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
            <div className="company-life-cont">
              <div className="com-life-head-para">
                <h1>Life at Company</h1>
                <p>{lifeAtCompany.description}</p>
              </div>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobData.map(each => (
              <SimilarJobs
                key={each.id}
                similarJobData={each}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  onRetryJobDetails = () => {
    this.getJobData()
  }

  renderJobFailureView = () => (
    <div className="job-details-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <div className="btn-conta">
        <button type="button" onClick={this.onRetryJobDetails}>
          retry
        </button>
      </div>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContants.success:
        return this.renderJobDetailsSucessView()
      case apiStatusContants.failure:
        return this.renderJobFailureView()
      case apiStatusContants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderJobDetails()}</div>
      </>
    )
  }
}
export default AboutJobItem
