import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import StyledTextField from "../../Views/TextInput";
import StyledSelectField from "../../Views/SelectionInput";
import StyledCheckbox from "../../Views/CheckBox";
import StyledRedioButton from "../../Views/RedioButton";

import style from './form.module.css';
import {getMockData} from "../../../utils/functions";

const Form = ({
                  handleSubmit
              }) => {

    const [formData, setFormData] = useState({
        values: {
            formRadio : 'oneops',
            databseCheckBox : [],
            databse2CheckBox : [],
        },
        errors: {},
        touched: {},
    });

    React.useEffect( ()=>{
        (async ()=>{
            let data = await getMockData();
            setFormData((preState)=>({
                ...preState,
                values : {...data,
                    formRadio : 'oneops',
                    databseCheckBox : [],
                    databse2CheckBox : []}
            }))
        })()
    },[])

    const submitFormData = () => {
        handleSubmit(formData.values);
    }

    const formHandler = (e,e2,key, index) => {
        let {name, value} = e.target;
        let  dummy = formData;
        if(index) dummy.values[key][index][name] = value
        setFormData((preState) => ({
            ...preState,
            values: {
                ...preState.values,
                [key ?? name]: key ? index !== undefined ? dummy.values[key] : {...preState.values[key], [name] : value } : value
            },
            errors: !key || !index ? {
                ...preState.errors,
                [name]: errorHander(name, value)
            } : {...preState.errors},
            touched: !key ? {
                ...preState.touched,
                [name]: true
            } : {...preState.touched}
        }))
    };

    const checkboxHandler = (e,e2,key, index) =>{
        const {name, value, checked} = e.target;
        setFormData((preState)=>({
            ...preState,
           values : {...preState.values,  [key] :  checked ? preState.values[key].concat(value) : preState.values[key].filter((item)=> item !== value)}
        }))
    };

    const errorHander = (name, value) => {
        if (!value) {
            return `${name} is required`
        } else if (value) {
            return false;
        }
    }

    const getMultiValue = React.useCallback((key1,key2,key3) =>{
        let value = []
        if(formData?.values[key3] ){
            if(key2 === 'Datacenter'&& formData?.values[key1]?.length){
                value = ["cdc", "ndc", "southcentral"];
                return value;
            }
            formData?.values[key3]?.forEach((item)=>{
                if(formData?.values[key1].some( (elm) => elm === Object.keys(item)[0])){
                    value = value.concat(item[Object.keys(item)[0]][0][key2])
                }
            })
            return value.filter(item => item ? true : false).toString();
        }
    },[formData, formData.values,formData?.values?.databseCheckBox?.length])

    const getMultiValue2 = React.useCallback((key1,key2,key3) =>{
        let value = []
        if(formData?.values?.platforms2){
            formData?.values?.platforms2?.forEach((item)=>{
                if(formData?.values[key1].some( (elm) => elm === Object.keys(item)[0])){
                    value = value.concat(item[Object.keys(item)[0]][0][key2])
                }
            })
            return value.filter(item => item ? true : false).toString();
        }
    },[formData, formData.values,formData?.values?.databseCheckBox?.length])


    return (
        <div>
            <Grid container className={style.formContainer}>
                <Grid xs={11} sm={11} md={11} lg={10} xl={10} item>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Org <span className={style.redAlrt}>&nbsp; *</span></div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledSelectField fullWidth
                                               name='org'
                                               displayEmpty
                                               renderValue={ () => formData?.values?.org}
                                               value={formData?.values?.org}
                                               onChange={formHandler}
                            >
                                <MenuItem key={'U.S Omni Tech'} value={'U.S Omni Tech'}>U.S Omni Tech</MenuItem>
                                <MenuItem key={'Indian Tech'} value={'Indian Tech'}>Indian Tech</MenuItem>
                                <MenuItem key={'Hindustan Tech'} value={'Hindustan Tech'}>Hindustan Tech</MenuItem>
                            </StyledSelectField>
                        </Grid>
                    </Grid>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Pillar <span className={style.redAlrt}>&nbsp; *</span>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledSelectField fullWidth
                                               name='pillar'
                                               displayEmpty
                                               renderValue={ () => formData?.values?.pillar}
                                               value={formData.values?.pillar}
                                               onChange={formHandler}
                            >
                                <MenuItem value={'Supply Chain Tech'}>Supply Chain Tech</MenuItem>
                                <MenuItem value={'Diversity Info'}>Diversity Info</MenuItem>
                                <MenuItem value={'Rudra Tech'}>Rudra Tech</MenuItem>
                            </StyledSelectField>
                        </Grid>
                    </Grid>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Product <span className={style.redAlrt}>&nbsp; *</span>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledSelectField fullWidth
                                               name='product'
                                               value={formData.values?.product}
                                               onChange={formHandler}
                                               displayEmpty
                                               renderValue={ () => formData?.values?.product}
                                // helperText={formData.errors?.product}
                            >
                                <MenuItem value={'catalog'}>catalog</MenuItem>
                                <MenuItem value={'Ten'}>Ten</MenuItem>
                                <MenuItem value={'Twenty'}>Twenty</MenuItem>
                                <MenuItem value={'Thirty'}>Thirty</MenuItem>
                            </StyledSelectField>
                        </Grid>
                    </Grid>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Product Id</div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledTextField fullWidth
                                             placeholder='Product Id'
                                             name='productID'
                                             // helperText={formData.errors?.productID}
                                             value={formData.values?.productID}
                                             onChange={formHandler}
                            />

                        </Grid>
                    </Grid>

                    <Grid container className={style.fieldBox}>
                        <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                            <div className={style.inputLable}>Environment</div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                            <StyledTextField fullWidth
                                             placeholder='Environment'
                                             name='environment'
                                             // helperText={formData.errors?.environment}
                                             value={formData.values?.environment}
                                             onChange={formHandler}
                            />
                        </Grid>
                    </Grid>

                    <FormControl sx={{marginTop:'15px'}}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={'oneops'}
                    >
                        <FormControlLabel  onChange={formHandler} name='formRadio' value="oneops" control={<StyledRedioButton />} label="OneOps" />
                        <FormControlLabel  onChange={formHandler} name='formRadio' value="wcnp" control={<StyledRedioButton default/>} label="WCNP" />
                    </RadioGroup>
                    </FormControl>

                    { formData.values.formRadio === 'oneops' ?
                        <>
                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>App Name</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='App Name'
                                                     name='appName'
                                                     // helperText={formData.errors?.appName}
                                                     value={formData.values?.oneops?.appName}
                                                     onChange={(e)=>formHandler(e,undefined,'oneops')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Assembly</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='assembly'
                                                     name='Assembly'
                                        // helperText={formData.errors?.wcnp?.assembly}
                                                     value={formData.values?.oneops?.assembly}
                                                     onChange={(e)=>formHandler(e,undefined,'oneops')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Environment</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Environment'
                                                     name='environment'
                                                     // helperText={formData.errors?.wcnp?.environment}
                                                     value={formData.values?.oneops?.environment}
                                                     onChange={(e)=>formHandler(e,undefined,'oneops')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Platform</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Platform'
                                                     name='platform'
                                                     // helperText={formData.errors?.wcnp?.platform}
                                                     value={formData.values?.oneops?.platform}
                                                     onChange={(e)=>formHandler(e,undefined,'oneops')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Concord</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Concord'
                                                     name='concord'
                                        // helperText={formData.errors?.wcnp?.concord}
                                                     value={formData.values?.oneops?.concord}
                                                     onChange={(e)=>formHandler(e,undefined,'oneops')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Looper</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Looper'
                                                     name='looper'
                                        // helperText={formData.errors?.wcnp?.looper}
                                                     value={formData.values?.oneops?.looper}
                                                     onChange={(e)=>formHandler(e,undefined,'oneops')}
                                    />
                                </Grid>
                            </Grid>
                        </>
                        :
                        <>
                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Name Space</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Name Space'
                                                     name='nameSpace'
                                        // helperText={formData.errors?.wcnp?.nameSpace}
                                                     value={formData.values?.wcnp?.nameSpace}
                                                     onChange={(e)=>formHandler(e,undefined,'wcnp')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>App Name</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='App Name'
                                                     name='appName'
                                                     // helperText={formData.errors?.wcnp?.appName}
                                                     value={formData.values?.wcnp?.appName}
                                                     onChange={(e)=>formHandler(e,undefined,'wcnp')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Clusters</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Clusters'
                                                     name='clusters'
                                                     // helperText={formData.errors?.wcnp?.clusters}
                                                     value={formData.values?.wcnp?.clusters}
                                                     onChange={(e)=>formHandler(e,undefined,'wcnp')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                    <div className={style.inputLable}>Kitt File</div>
                                </Grid>
                                <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                    <StyledTextField fullWidth
                                                     placeholder='Kitt File'
                                                     name='kittFile'
                                                     // helperText={formData.errors?.wcnp?.kittFile}
                                                     value={formData.values?.wcnp?.kittFile}
                                                     onChange={(e)=>formHandler(e,undefined,'wcnp')}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    }

                    <div className={style.basicData}><p>serviceRegistry  :  &nbsp;</p><span>{formData?.values?.serviceRegistry}</span></div>
                    <div className={style.basicData}><p>description  :  &nbsp;</p><span>{formData?.values?.description}</span></div>
                    <div className={style.basicData}><p>tier  :  &nbsp;</p><span>{formData?.values?.tier}</span></div>
                    <div className={style.basicData}><p>apmID  :  &nbsp;</p><span>{formData?.values?.apmID}</span></div>
                    <div className={style.basicData}><p>adgroup  :  &nbsp;</p><span>{formData?.values?.adgroup}</span></div>
                    <div className={style.basicData}><p>servicenow  :  &nbsp;</p><span>{formData?.values?.servicenow}</span></div>
                    <div className={style.basicData}><p>xMatter  :  &nbsp;</p><span>{formData?.values?.xMatter}</span></div>
                    <div className={style.basicData}><p>dl  :  &nbsp;</p><span>{formData?.values?.dl}</span></div>
                    <div className={style.basicData}><p>jira  :  &nbsp;</p><span>{formData?.values?.jira}</span></div>
                    <div className={style.basicData}><p>poc  :  &nbsp;</p><span>{formData?.values?.poc}</span></div>
                    <div className={style.basicData}><p>owner  :  &nbsp;</p><span>{formData?.values?.owner}</span></div>
                    <div className={style.basicData}><p>l3  :  &nbsp;</p><span>{formData?.values?.l3}</span></div>
                    <div className={style.basicData}><p>l4  :  &nbsp;</p><span>{formData?.values?.l4}</span></div>
                    <div className={style.basicData}><p>l5  :  &nbsp;</p><span>{formData?.values?.l5}</span></div>
                    <div className={style.basicData}><p>gitRepo  :  &nbsp;</p><span>{formData?.values?.gitRepo}</span></div>
                    <div className={style.basicData}><p>checkmarx  :  &nbsp;</p><span>{formData?.values?.checkmarx}</span></div>
                    <div className={style.basicData}><p>sonarqube  :  &nbsp;</p><span>{formData?.values?.sonarqube}</span></div>
                    <div className={style.basicData}><p>hyegiea  :  &nbsp;</p><span>{formData?.values?.hyegiea}</span></div>
                    <div className={style.basicData}><p>splunkURL  :  &nbsp;</p><span>{formData?.values?.splunkURL}</span></div>
                    <div className={style.basicData}><p>dynatrace  :  &nbsp;</p><span>{formData?.values?.dynatrace}</span></div>
                    <div className={style.basicData}><p>prometheus  :  &nbsp;</p><span>{formData?.values?.prometheus}</span></div>
                    <div className={style.basicData}><p>istioGrafana  :  &nbsp;</p><span>{formData?.values?.istioGrafana}</span></div>
                    <div className={style.basicData}><p>podGrafana  :  &nbsp;</p><span>{formData?.values?.podGrafana}</span></div>
                    <div className={style.basicData}><p>appGrafana  :  &nbsp;</p><span>{formData?.values?.appGrafana}</span></div>

                        <Typography variant="h4" className={style.justifyStart} gutterBottom>
                            CCM
                        </Typography>

                    {
                         formData?.values?.ccm?.map((item,index)=>(
                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={style.subFieldBox} item>
                                    <Grid container>
                                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                                            <div className={style.inputLable}>URL</div>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={10} lg={10} xl={10} item>
                                            <StyledTextField fullWidth
                                                             placeholder='Url'
                                                             name='url'
                                                // helperText={formData.errors?.ccm[index]?.url}
                                                //              value={formData.values?.ccm[index]?.url}
                                                             value={item?.url}
                                                             onChange={(e)=>formHandler(e,undefined,'ccm',index)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid >

                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={style.subFieldBox} item>
                                    <Grid container>
                                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                                            <div className={style.inputLable}>Path</div>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={10} lg={10} xl={10} item>
                                            <StyledTextField fullWidth
                                                             placeholder='Path'
                                                             name='path'
                                                // helperText={formData.errors?.ccm[index]?.url}
                                                //              value={formData.values?.ccm[index]?.path}
                                                             value={item?.path}
                                                             onChange={(e)=>formHandler(e,undefined,'ccm',index)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid >
                                {formData?.values?.ccm?.length -1  === index &&
                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={`${style.alienCenter} ${style.subFieldBox}`} item>
                                    <Button variant="contained" sx={{
                                        margin:'10px 0px'
                                    }}
                                            onClick={()=>{
                                                setFormData((prevState)=>({
                                                    ...prevState,
                                                    values: {
                                                        ...prevState.values,
                                                        ccm : prevState.values.ccm?.concat({url : '', path : ''})
                                                    }
                                                }))
                                            }}
                                    >Add New Entery</Button>
                                </Grid >}

                            </Grid>
                        ))
                    }


                        <Typography variant="h4" className={style.justifyStart} gutterBottom>
                            Secrets
                        </Typography>

                    {
                        formData?.values?.secrets?.map((secrets,index)=>(
                            <Grid container className={style.fieldBox}>
                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={style.subFieldBox} item>
                                    <Grid container>
                                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                                            <div className={style.inputLable}>URL</div>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={10} lg={10} xl={10} item>
                                            <StyledTextField fullWidth
                                                             placeholder='Secrets Urls'
                                                             name='secretsUrls'
                                                // helperText={formData.errors?.secretsUrls}
                                                             value={secrets?.url}
                                                             onChange={formHandler}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid >

                                <Grid xs={12} sm={12} md={12} lg={12} xl={4} className={style.subFieldBox} item>
                                    <Grid container>
                                        <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                                            <div className={style.inputLable}>Path</div>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={10} lg={10} xl={10} item>
                                            <StyledTextField fullWidth
                                                             placeholder='Secret Path'
                                                             name='secretPath'
                                                // helperText={formData.errors?.secretPath}
                                                             value={secrets?.path}
                                                             onChange={formHandler}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid >
                                {formData?.values?.secrets?.length - 1 === index &&
                                <Grid xs={12} sm={12} md={12} lg={12} xl={4}
                                      className={`${style.alienCenter} ${style.subFieldBox}`} item>
                                    <Button variant="contained" sx={{
                                        margin: '10px 0px'
                                    }}
                                            onClick={()=>{
                                                setFormData((prevState)=>({
                                                    ...prevState,
                                                    values: {
                                                        ...prevState.values,
                                                        secrets : prevState.values.secrets?.concat({url : '', path : ''})
                                                    }
                                                }))
                                            }}
                                    >Add New Entery</Button>
                                </Grid>
                                }

                            </Grid>
                        ))
                    }

                        <Typography variant="h3" className={style.justifyStart} gutterBottom>
                            Database
                        </Typography>

                        <Grid container>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{display:'flex', alignItems:'start', flexDirection:'column'}} item>
                                <span><StyledCheckbox onChange={(e)=>checkboxHandler(e,undefined,'databseCheckBox')} value='cassandra' color="success" name='database'/> Cassandra</span>
                                <span><StyledCheckbox onChange={(e)=>checkboxHandler(e,undefined,'databseCheckBox')} value='mongo' color="success" name='database'/> Mongo</span>
                                <span><StyledCheckbox onChange={(e)=>checkboxHandler(e,undefined,'databseCheckBox')} value='cosmosdb' color="success" name='database'/> Cosmosdb</span>
                                <span><StyledCheckbox onChange={(e)=>checkboxHandler(e,undefined,'databseCheckBox')} value='yugabyte' color="success" name='database'/> Yugabyte</span>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{display:'flex', alignItems:'start', flexDirection:'column'}}  item>
                                <span><StyledCheckbox onChange={(e)=>checkboxHandler(e,undefined,'databseCheckBox')} color="success" value='postgresql' name='database' /> Postgresql</span>
                                <span><StyledCheckbox onChange={(e)=>checkboxHandler(e,undefined,'databseCheckBox')} color="success" value='azuresql' name='database' /> Azuresql</span>
                                <span><StyledCheckbox onChange={(e)=>checkboxHandler(e,undefined,'databseCheckBox')} color="success" value='oracle' name='database' /> Oracle</span>
                            </Grid>
                        </Grid>

                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>ClusterName</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='ClusterName'
                                                 name='dbname'
                                    // helperText={formData.errors?.dbname}
                                    //              value={formData.values?.dbname}
                                                 value={getMultiValue('databseCheckBox','dbname','platforms')}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Version</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Version'
                                                 name='version'
                                                 // helperText={formData.errors?.version}
                                                 value={getMultiValue('databseCheckBox','version','platforms')}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Data Centers</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Data Centers'
                                                 name='Datacenter'
                                                 helperText={formData.errors?.Datacenter}
                                                 value={getMultiValue('databseCheckBox','Datacenter','platforms')}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Team Contact</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Team Contact'
                                                 name='teamcontact'
                                                 // helperText={formData.errors?.teamcontact}
                                                 value={getMultiValue('databseCheckBox','teamcontact','platforms')}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>MMSDC View</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='MMSDC View'
                                                 name='mmslink'
                                                 helperText={formData.errors?.mmslink}
                                                 value={getMultiValue('databseCheckBox','mmslink','platforms')}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        {/*<Grid container className={style.fieldBox}>*/}
                        {/*    <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>*/}
                        {/*        <div className={style.inputLable}>MMS Cluster View</div>*/}
                        {/*    </Grid>*/}
                        {/*    <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>*/}
                        {/*        <StyledTextField fullWidth*/}
                        {/*                         placeholder='MMS Cluster View'*/}
                        {/*                         name='mmsClusterView'*/}
                        {/*                         helperText={formData.errors?.mmsClusterView}*/}
                        {/*                         value={formData.values?.mmsClusterView}*/}
                        {/*                         onChange={formHandler}*/}
                        {/*        />*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                        ---------------------------------------------------------------------------------------------------------------
                        <Grid container>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{display:'flex', alignItems:'start', flexDirection:'column'}} item>
                                <span><StyledCheckbox  onChange={(e)=>checkboxHandler(e,undefined,'databse2CheckBox')} value='meghacache' color="success" name='container'/> Meghacache</span>
                                <span><StyledCheckbox  onChange={(e)=>checkboxHandler(e,undefined,'databse2CheckBox')} value='elasticsearch' color="success" name='container'/> Elasticsearch</span>
                                <span><StyledCheckbox  onChange={(e)=>checkboxHandler(e,undefined,'databse2CheckBox')} value='storm' color="success" name='container'/> Storm</span>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={6} xl={6} sx={{display:'flex', alignItems:'start', flexDirection:'column'}}  item>
                                <span><StyledCheckbox onChange={(e)=>checkboxHandler(e,undefined,'databse2CheckBox')} value='kafta' color="success" name='container' /> Kafta</span>
                                <span><StyledCheckbox onChange={(e)=>checkboxHandler(e,undefined,'databse2CheckBox')} value='soir' color="success" name='container' /> Soir</span>
                            </Grid>
                        </Grid>

                        {/*<Typography variant="h4" className={style.justifyStart} gutterBottom>*/}
                        {/*    Kafka*/}
                        {/*</Typography>*/}
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Cluster</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Cluster'
                                                 name='cluster'
                                                 // helperText={formData.errors?.cluster}
                                                 value={getMultiValue2('databse2CheckBox','cluster')}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Topic</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Topic'
                                                 name='topic'
                                                 // helperText={formData.errors?.topic}
                                                 value={getMultiValue2('databse2CheckBox','topic')}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={style.fieldBox}>
                            <Grid xs={12} sm={12} md={3} lg={4} xl={4} item>
                                <div className={style.inputLable}>Lense URL</div>
                            </Grid>
                            <Grid xs={12} sm={12} md={9} lg={8} xl={8} item>
                                <StyledTextField fullWidth
                                                 placeholder='Lenc Url'
                                                 name='lencurl'
                                                 // helperText={formData.errors?.lencurl}
                                                 value={getMultiValue2('databse2CheckBox','lencurl')}
                                                 onChange={formHandler}
                                />
                            </Grid>
                        </Grid>


                        <Button variant="contained"
                                color="success"
                                sx={{
                                    borderRadius: 28,
                                    width: '30%'
                                }}
                                onClick={submitFormData}
                        >
                            Submit
                        </Button>
                        </Grid>
                        </Grid>

        </div>
    )
}

export default Form;
