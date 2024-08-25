import { sideBarOptions } from "../../utils";
import Icons from "../Icons";
import styles from "../Sidebar/Sidebar.module.scss";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  page?: string;
}

const SideBar = (props: SideBarProps) => {
  const navigate = useNavigate();

  const handleNavigation = (route: any) => {
    navigate(route);
  };

  return (
    <div className={styles.container}>
      <div className={styles.companyName}>
        <div className={styles.logo}>CI</div>
        CompareIt
      </div>

      {sideBarOptions.map((option, index) => (
        <div
          className={styles.row}
          onClick={() => handleNavigation(option?.route)}
        >
          <div className={styles.iconContainer}>
            <Icons icon={option.icon} page={props?.page} />
          </div>
          <div
            style={{
              color: props?.page === option.icon ? "#007AFF" : "#A7A8AB",
            }}
          >
            {option.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
