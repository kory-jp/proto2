import Select from 'react-select'

export const SelectComponent = (props) => {
  const { onChange, options, value} = props

  return(
    <Select 
      placeholder="分野を選択してください"
      isMulti
      name="tag"
      options={options}
      onChange={onChange}
      value={value}
    />
  )
}

export default SelectComponent; 