import Select from 'react-select'

export const SelectComponent = (props) => {
  const { onChange, defaultValue, options} = props

  return(
    <Select 
      placeholder="分野を選択してください"
      isMulti
      name="tag"
      options={options}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  )
}

export default SelectComponent; 