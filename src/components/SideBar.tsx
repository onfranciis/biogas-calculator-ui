import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation().pathname;

  return (
    <div className="SideBar">
      {Data.map((link) => {
        const selected = link.link == location;

        return (
          <Link
            to={link.link}
            key={link.title}
            className={`${selected && "selected"}`}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;

const Data = [
  {
    link: "/fat",
    title: "Fat Percentage",
  },
  {
    link: "/ash",
    title: "Ash Percentage",
  },
  {
    link: "/protein",
    title: "Protein Percentage",
  },
  {
    link: "/moisture",
    title: "Moisture Percentage",
  },
  {
    link: "/fibre",
    title: "Fibre Percentage",
  },
  {
    link: "/total-solids",
    title: "Determine Total Solids",
  },
  {
    link: "/volatile-solids",
    title: "Determine Volatile Solids",
  },
];
