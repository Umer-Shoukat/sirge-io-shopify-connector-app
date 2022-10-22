import { Heading, TextContainer, Icon, DisplayText } from "@shopify/polaris";
import { StarFilledMinor } from "@shopify/polaris-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'
const Reviews = () => {
  return (
    <>
      <div style={{textAlign: "center" , margin: "20px 0"}}>
        <DisplayText element="h1">Rate this app</DisplayText>
        <TextContainer spacing="loose">
          <p style={{margin: "10px"}}>
            Tell oter what you think of this application and benefit of having
            visibility to on-site behaviour provides to your business.
          </p>
        </TextContainer>
        <div style={{display: "flex" , width: "50%" , alignItems:"center" , alignContent: "center" , margin: " 0 auto" , justifyContent: "center" , padding: "10px 0"}}>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        </div>
        <TextContainer spacing="loose">
          <p style={{margin: "10px"}}>
           You'll be taken to the Shopify App Store to set your rating
          </p>
        </TextContainer>
      </div>
      <TextContainer spacing="loose">
          <p style={{margin: "10px"}}>
           Note: Disconnecting your Sirge account or uninstalling this application will not cancel your Sirge Account. If you want to cancel your Sirge account, log ito sirge to adjust your account services with them directly.
          </p>
        </TextContainer>
    </>
  );
};

export default Reviews;
