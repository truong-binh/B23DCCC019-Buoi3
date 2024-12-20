import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/itemsSlice";

interface ItemFormProps {
    item?: { id: number; name: string; price: number; category: string };
    onUpdate?: (item: {
        id: number;
        name: string;
        price: number;
        category: string;
    }) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, onUpdate }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Thực phẩm");
    const dispatch = useDispatch();

    useEffect(() => {
        if (item) {
            setName(item.name);
            setPrice(item.price.toString());
            setCategory(item.category);
        }
    }, [item]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onUpdate) {
            onUpdate({ id: item!.id, name, price: Number(price), category });
        } else {
            dispatch(
                addItem({
                    id: Date.now(),
                    name,
                    price: Number(price),
                    category,
                })
            );
        }
        setName("");
        setPrice("");
        setCategory("Thực phẩm");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{item ? "Chỉnh Sửa Hàng Hóa" : "Thêm Hàng Hóa"}</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên hàng hóa"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Giá hàng hóa"
                required
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Thực phẩm">Thực phẩm</option>
                <option value="Văn phòng phẩm">Văn phòng phẩm</option>
                <option value="Khác">Khác</option>
            </select>
            <button type="submit">{item ? "Cập nhật" : "Thêm Hàng Hóa"}</button>
        </form>
    );
};

export default ItemForm;
