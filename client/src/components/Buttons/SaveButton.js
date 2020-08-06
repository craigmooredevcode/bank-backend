import React from 'react'
import { Button } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';

export default function SaveButton(props) {
  const { clicked } = props;
  return (
    <Button onClick={clicked} size="lg" style={{fontFamily: "'DM Sans', sans-serif", backgroundColor: "#008000", border: "none"}}>
        <SaveIcon className="mr-2" />
        Save Changes
    </Button>
  )
}
