import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, editItem } from "../features/itemsSlice";
import { RootState } from "../store";
import ItemForm from "./ItemForm";
import { Item } from "../features/itemsSlice";

const ItemTable: React.FC = () => {
    const items = useSelector((state: RootState) => state.items.items);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, items]);

    const totalPrice = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price, 0);
    }, [items]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = (item: Item) => {
        setEditingItem(item);
    };

    const handleUpdateItem = (updatedItem: Item) => {
        dispatch(editItem(updatedItem));
        setEditingItem(null);
    };

    return (
        <div>
            <h2>Bảng Thông Tin</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Loại</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>
                                    Chỉnh sửa
                                </button>
                                <button
                                    onClick={() =>
                                        dispatch(removeItem(item.id))
                                    }
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Trước
                </button>
                <span>
                    Trang {currentPage}/{totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Sau
                </button>
            </div>
            <p>Tổng giá hàng hóa: {totalPrice}</p>

            {editingItem && (
                <ItemForm item={editingItem} onUpdate={handleUpdateItem} />
            )}
        </div>
    );
};

export default ItemTable;
