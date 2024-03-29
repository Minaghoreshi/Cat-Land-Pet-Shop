import { AddModal } from "../../modals/add-edit-modal/AddModal";
import { DeleteModal } from "../../modals/delete-product-modal/DeleteModal";
import { THead } from "../table-parts";
export const ProductsTable = ({ data, columns }) => {
  return (
    <table className="table ">
      <THead column={columns} />
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={row._id}
            className={rowIndex % 2 !== 0 ? "bg-gray-50" : "bg-white"}
          >
            {columns.map((column) => (
              <td key={column.key} className="table--td ">
                {column.key === "thumbnail" ? (
                  <div className="flex justify-center">
                    <img
                      className="w-[100px]"
                      src={`http://localhost:8000/images/products/thumbnails/${row.thumbnail}`}
                      alt="thumbnail"
                    />
                  </div>
                ) : column.key === "name" ? (
                  <div>{row.name}</div>
                ) : (
                  ` ${row.category} / ${row.subCategory}`
                )}
              </td>
            ))}

            <td className="table--td text-center">
              <div>
                <DeleteModal data={row} />
                <span> / </span>
                <AddModal product={row} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
