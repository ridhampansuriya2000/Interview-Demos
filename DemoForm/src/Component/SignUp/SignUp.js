import React, {useState} from "react";
import StyledTextField from "../Views/TextInput";
import ToggleButton from "../Views/ToggleButton";
import Grid from '@mui/material/Grid';

/*---------------Style--------------------*/
import style from './signup.module.css'
import Form from "./Form/Form";

const SignUp = () => {

    const handleSubmit = (data) =>{

    }

    return (
        //<div>
        <Grid container className={style.signUpContainer} >
            <Grid xs={11} sm={11} md={10} lg={8} xl={8} item>
                <div className={style.fromContainer}>

                    <div className={style.FormHeader}>
                        Organization Form
                    </div>

                    <Form handleSubmit={handleSubmit}/>
                </div>
            </Grid>
        </Grid>
        // </div>
    )
}

export default SignUp;