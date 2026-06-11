function DropDownSelectionItem({ value, onChange }) {
    return(
        <>
            <select name='ItemSelection' id='SelectItem' value={value} onChange={(e) => onChange(e.target.value)}>
                <option>Magic Item</option>
                <option>Armor</option>
                <option>Weapon</option>
            </select>
        </>
    )
}

export default DropDownSelectionItem;