import React from "react";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const UsageForm = (props: any) => {
    const usageData = props.usage;
    const [usage, setUsage] = React.useState(usageData);
    const [total, setTotal] = React.useState(0.0);
    const [formInvalid, setFormInvalid] = React.useState(false);

    const user = props.user;
    const usageTypes = props.usageTypes;


    const partialUsageUpdate = (obj: Partial<typeof usage>) => {
        setUsage({ ...usage, ...obj });
    }

    const handleChangeUsageType = (event: SelectChangeEvent) => {
        let value = parseInt(event.target.value, 10);
        partialUsageUpdate({ usage_type: value });
        setTotalAmount(usage.amount, value);
    }

    const setUsageAt = (newDate: any) => {
        partialUsageUpdate({ usage_at: newDate });
    }

    const setAmount = (event: any) => {
        let value = parseFloat(event.target.value);
        partialUsageUpdate({ amount: value });
        setTotalAmount(value, usage.usage_type);
    }

    const setTotalAmount = (amount: any, usage_type: any) => {
        try {
            if ([null, undefined, ""].includes(usage_type) || amount === 0)
                setTotal(0);
            let usType = usageTypes.filter((usageType: any) => usageType.id === usage_type);
            let value = usType[0].factor * amount;
            setTotal(Math.round(value * 1000) / 1000);
        } catch (error: any) {
            setTotal(0);
        }
    }

    const checkData = () => {
        if ([null, undefined, ""].includes(usage.user) || [null, undefined, ""].includes(usage.usage_type) ||
            [null, undefined, ""].includes(usage.usage_at) || [null, undefined, "", 0].includes(usage.amount)) {
            setFormInvalid(true);
        }
        else {
            usage["amount"] = total;
            
            props.handleSubmit(usage);
        }
    }

    return (
        <React.Fragment>
            {formInvalid === true ? <Alert onClose={() => setFormInvalid(false)} severity="error">
                <AlertTitle>Error</AlertTitle>
                Form not valid — <strong>Please check the fields!</strong>
            </Alert> : null}
            <Typography variant="h6" gutterBottom>
                {usage.id !== null ? "Edit Usage" : "Insert Usage"}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <DateTimePicker
                        renderInput={(props) => <TextField fullWidth {...props} />}
                        label="DateTimePicker"
                        value={usage.usage_at}
                        onChange={(newDate) => {
                            setUsageAt(newDate);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled
                        id="user"
                        name="user"
                        label="User"
                        fullWidth
                        // autoComplete="given-name"
                        variant="standard"
                        value={user.first_name + " " + user.last_name}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="select-usage-type-label">Usage Type</InputLabel>
                        <Select
                            required
                            labelId="select-usage-type-label"
                            id="usage_type"
                            value={usage.usage_type}
                            onChange={handleChangeUsageType}
                        >

                            {usageTypes.map((usageType: any) =>
                                <MenuItem key={usageType.id} value={usageType.id}>{usageType.name} (Unit: {usageType.unit} - Factor: {usageType.factor})</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="amount"
                        name="amount"
                        label="Amount"
                        fullWidth
                        variant="standard"
                        onChange={setAmount}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*.[0-9]*' }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        disabled
                        id="total"
                        name="total"
                        label="Total"
                        fullWidth
                        variant="standard"
                        value={total}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                onClick={() => checkData()}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >Save</Button>
        </React.Fragment>
    );
};

export default UsageForm;