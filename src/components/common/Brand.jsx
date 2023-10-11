import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BrandDark from "../../assets/BrandDark.svg";
import BrandLight from "../../assets/BrandLight.svg";
import BrandDarkMobile from "../../assets/BrandDarkMobile.svg";
import BrandLightMobile from "../../assets/BrandLightMobile.svg";

const Brand = () => {
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <>
      <div className="hidden md:block">
        <Link to="/">
          <img
            src={isDarkMode ? BrandLight : BrandDark}
            alt="Dazzlr"
            className="object-contain"
          />
        </Link>
      </div>
      <div className="block md:hidden">
        <Link to="/">
          <img
            src={isDarkMode ? BrandLightMobile : BrandDarkMobile}
            alt="Dazzlr"
            className="object-contain"
          />
        </Link>
      </div>
    </>
  );
};
export default Brand;
