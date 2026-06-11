function DropDownSelectionItem({ value, onChange }) {
    return(
        <>
            <select name='ItemSelection' id='SelectItem' value={value} onChange={(e) => onChange(e.target.value)}>
                <option>Magic Items</option>
                <option>Armor</option>
                <option>Weapons</option>
            </select>
        </>
    )
}

export default DropDownSelectionItem;