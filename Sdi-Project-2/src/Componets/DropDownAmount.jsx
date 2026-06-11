function DropDownAmount({ value, onChange }) {
    return(
        <>
            <select name='RandAmount' id='SelectNumber' value={value} onChange={(e) => onChange(e.target.value)}>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
            </select>
        </>
    )
}

export default DropDownAmount;