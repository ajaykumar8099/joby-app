import {Link} from 'react-router-dom'
import {BsFilBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationON} from 'react-icons/md'

const SimilarJobItem = props => {
  const {jobDatails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = jobDatails
  return (
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
          <h1>Description</h1>
          <p>{jobDescription}</p>
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
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
