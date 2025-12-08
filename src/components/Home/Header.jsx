import { BsChat, BsBell, BsGear } from "react-icons/bs";
import logo from "../../assets/logo/blended.png";

export const Header = () => {
  return (
    <header className="container-fluid py-2 border-bottom bg-white">
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-6 col-md-3 d-flex align-items-center gap-2">
          <img src={logo} className="img-fluid header-logo" alt="logo" />
        </div>

        {/* Center Section */}
        <div className="col-12 col-md-6 text-center mt-2 mt-md-0">
          <h6 className="board-title mb-0">TN Board</h6>
          <p className="subject-line mb-0 fw-bold">
            <span>Class 10</span> | Mathematics
          </p>
        </div>

        {/* Right Section */}
        <div className="col-6 col-md-3 d-flex align-items-center justify-content-end gap-3 mt-2 mt-md-0">
          <div className="coins-box d-flex align-items-center">
            <img
              src="https://img.icons8.com/emoji/48/coin-emoji.png"
              alt="coins"
              className="coin-icon"
            />
            <span>250 coins</span>
          </div>

          <BsChat size={20} />
          <BsBell size={20} />
          <BsGear size={20} />

          <img
            src="https://i.pravatar.cc/40"
            className="profile-img"
            alt="profile"
          />
          
        </div>
      </div>
    </header>
  );
};
