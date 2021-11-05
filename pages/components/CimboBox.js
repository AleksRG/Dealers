import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox() {
  return (
    <div className="p-5">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={models}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="All" />}
      />
    </div>
  );
}

const models = [
  { label: "Suzuki", make: ["GSXR", "Bandit"] },
  { label: "Ducati", make: ["Panigale", "Test"] },
  { label: "KTM", make: ["990SMT"] },
  { label: "Honda", make: ["CBR1000RR"] },
];
