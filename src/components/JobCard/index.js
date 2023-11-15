import {Link} from 'react-router-dom'
import {BsFilBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationON} from 'react-icons/md'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    id,
    title,
    rating,
  } = jobData
  return (
    <Link to={`jobs?${id}`} className="link-item">
      <li>
        <div>
          <div>
            <img src={companyLogoUrl} alt="componat-logo" />
            <div>
              <h1>{title}</h1>
              <div className="rating-container">
                <BsStarFill className="rating-icon" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <MdLocationON className="location-logo" />
                <p>{location}</p>
              </div>
              <div>
                <BsFilBriefcaseFill className="brief-logo" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
