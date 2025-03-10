import { Image } from "react-bootstrap";
import ExampleBanner from "../../../assets/example_images/yosemite_banner.jpg";
import { useNavigate } from "react-router-dom";

/**
 * Displays the banner and title on the shelter profile.
 * Allows edit button when authenticated as relevant shelter.
 * @param {contextUserId, userInfo} props 
 */
function ShelterProfileBanner(props) {
    const userInfo = props.userInfo;
    const navigate = useNavigate();
    
    return (
        <div style={{
            backgroundImage: `url(${ userInfo?.banner ? userInfo?.banner : ExampleBanner})`,
            backgroundSize: "cover",
            width: "100%",
            height: "20rem",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
                height: "20rem",
                background: "rgba(0, 0, 0, 0.45)"
            }}>
                <h1 id="banner-title">
                    {
                        (userInfo?.mission_title !== null && userInfo?.mission_title !== '') ? 
                        userInfo?.mission_title : 
                        "Example Shelter Name"
                    }

                    {   // Check if viewer is same as page owner
                        (props.contextUserId === userInfo?.id) && (
                            <a href="" onClick={() => { navigate("/profileedit") }}>
                                <i className="bi bi-pencil-square shelter-profile-edit-icon"></i>
                            </a>
                        )
                    }
                </h1>
            </div>
        </div>
    );
}

{/* <div class="profile-banner">
  <div class="overlay">
    <div class="overlay-content">
      <h1>
        Toronto Zoo Escapees
        <a class="shelter-profile-edit-icon" href="shelter_profile_edit.html">
          <!--https://icons.getbootstrap.com/icons/pencil-square/-->
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </a>
      </h1>
    </div>
  </div>
</div> */}

export default ShelterProfileBanner;