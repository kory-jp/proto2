import React from "react";

const TextFormat = ({content}) => {
  const texts = content ? content.split(/(\n)/).map((item, index) => {
    return (
      <React.Fragment key={index}>
        {
          item.match(/\n/) ? <br/> : item
        }
      </React.Fragment>
    )
  }) : null
  return <>{texts}</>
}

export default TextFormat;