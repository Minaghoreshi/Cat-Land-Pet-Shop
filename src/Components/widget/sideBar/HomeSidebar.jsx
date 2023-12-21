import { HiPlus, HiMinus } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
export const HomeSidebar = ({ menuItems, setMenuItems }) => {
  const showSubCategory = (categoryId) => {
    setMenuItems((prevItems) => {
      return prevItems.map((item) =>
        item._id === categoryId ? { ...item, isOpen: !item.isOpen } : item
      );
    });
  };
  const { id } = useParams();

  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <div key={item._id} className="sidebar-item">
          <div className="item-label">
            {!item.isOpen ? (
              <HiPlus
                className="cursor-pointer"
                onClick={() => showSubCategory(item._id)}
              />
            ) : (
              <HiMinus
                className="cursor-pointer"
                onClick={() => showSubCategory(item._id)}
              />
            )}
            <Link to={`/category/${item._id}`}>
              <span className={id && item._id === id ? "text-selected" : ""}>
                {item.name}
              </span>
            </Link>
          </div>
          <hr />
          {item.isOpen && (
            <ul className="sub-items">
              {item.subCategories.map((subcategory, index) => (
                <Link
                  to={`/SubCategory/${subcategory._id}`}
                  key={subcategory._id}
                >
                  <li
                    className={
                      id && subcategory._id === id
                        ? " sub-items-li text-selected"
                        : "sub-items-li"
                    }
                  >
                    {subcategory.name}{" "}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
