import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SegmentIcon from '@mui/icons-material/Segment';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CardActions from '@mui/material/CardActions';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import './App.css'

const initialForm = {
  question: 'Untitled Question',
  answer: '',
  required: false,
  type: 'text',
  option: ['option 1']
};

function App() {
  const classes = useStyles();

  // local state
  const [forms, setForms] = useState([initialForm]);
  const [formHeader, setFormHeader] = useState({
    title: 'Form Title',
    description: '',
  });

  const handleRenderOption = (option, indexOfForm, form) => {
    switch (option) {
      case 'checkbox':
      case 'radio':
      case 'select':
        return (
          <div>
            {form.option.map((item, index) => (
              <div className="flex" key={index}>
                <TextField value={form.option[index]} size="small" sx={{ width: '90%' }} onChange={(e) => handleChangeOption(e.target.value, index, form, indexOfForm)}/>
                <div className="self-center px-10">
                  <IconButton onClick={() => handleDeleteOption(indexOfForm, index)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            ))}
            <Button color="primary" sx={{ color: '#000', paddingTop: '1rem' }} onClick={() => handleAddOption(indexOfForm)}>
              Add Other Option
            </Button>
          </div>
        );
      default:
        break;
    }
  };
  const handleAddQuestion = () => {
    setForms([...forms, initialForm]);
  };
  const handleDeleteQuestion = (indexOfForm) => {
    const temp = [...forms];
    temp.splice(indexOfForm, 1);
    setForms(temp);
  };
  const handleDuplicateQuestion = (indexOfForm) => {
    const temp = [...forms];
    const formData = temp[indexOfForm];
    setForms([...forms, formData]);
  };

  const handleChange = ({ target: { name, value } }, indexOfForm) => {
    const temp = [...forms];
    const tempItem = {...temp[indexOfForm]}
    tempItem[name] = value;
    temp[indexOfForm] = tempItem
    setForms(temp);
  };
  const handleChangeOption = (text, indexOfOption, form, indexOfForm) => {
    const temp = [...forms];
    const tempOption = [...temp[indexOfForm].option]
    tempOption[indexOfOption] = text;
    temp[indexOfForm].option = tempOption
    setForms(temp);
  };
  console.log(forms, 'forms');
  const handleChangeCheck = (event, indexOfForm) => {
    const temp = [...forms];
    const tempItem = { ...forms[indexOfForm] };
    tempItem.required = event.target.checked
    temp[indexOfForm] = tempItem;
    setForms(temp);
  };

  const handleChangeHeader = ({ target: { name, value } }) => {
    setFormHeader({ ...formHeader, [name]: value });
  };

  const handleAddOption = (indexOfForm) => {
    const temp = [...forms];
    const tempItem = [...temp[indexOfForm].option]
    tempItem.push(`Option ${tempItem.length + 1}`)
    temp[indexOfForm].option = tempItem
    setForms(temp);
  }
  const handleDeleteOption = (indexOfForm, indexOfOption) => {
    const temp = [...forms];
    const tempOption = [...temp[indexOfForm].option]
    tempOption.splice(indexOfOption, 1)
    temp[indexOfForm].option = tempOption
    setForms(temp);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...forms,
      ...formHeader
    }
    console.log(payload, 'submitted forms');
  }
  return (
    <motion.div
      className="w-full mt-40 mb-24 ml-16 mr-16 pr-60"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
    >
      <Box>
      <div className="flex justify-center" style={{ backgroundColor: '#F0EBF8' }}>
      <form className="pt-20" style={{ width: '60%' }} onSubmit={handleSubmit}>
        <Card variant="outlined">
          <CardContent>
            <div>
              <TextField
                placeholder="Form Title"
                fullWidth
                className="mb-20"
                name="title"
                value={formHeader.title}
                classes={{ root: classes.customTextField }}
                inputProps={{ style: { fontSize: 30, fontWeight: 'bolder' } }}
                required
                onChange={handleChangeHeader}
              />
              <TextField
                placeholder="Form Description"
                fullWidth
                type="text"
                multiline
                className="mb-20"
                name="description"
                value={formHeader.description}
                required
                onChange={handleChangeHeader}
              />
              <TextField
                placeholder="Client Email"
                fullWidth
                type="email"
                name="email"
                value={formHeader.email}
                required
                onChange={handleChangeHeader}
              />
            </div>
          </CardContent>
        </Card>
        {forms?.map((form, index) => (
          <div className="py-10">
            <Card variant="outlined">
              <CardContent>
                <div className="flex justify-between">
                  <TextField
                    placeholder="Form Title"
                    // fullWidth
                    className="mb-20"
                    sx={{
                      width: '55%',
                    }}
                    required
                    value={form.question}
                    name="question"
                    onChange={(e) => handleChange(e, index)}
                  />

                  <TextField
                    select
                    sx={{
                      width: '35%',
                    }}
                    required
                    value={form.type}
                    name="type"
                    onChange={(e) => handleChange(e, index)}
                  >
                    {multipleQuestionChoice?.map((item, ind) => (
                      <MenuItem
                        value={item.value}
                        key={ind}
                        sx={{ fontSize: '18px', padding: '1rem 0xp' }}
                      >
                        <span style={{ paddingRight: '.6rem' }}>{item.icon}</span> {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div>{handleRenderOption(form.type, index, form)}</div>
              </CardContent>
              <CardActions>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.required}
                      name="required"
                      onChange={(e) => handleChangeCheck(e, index)}
                    />
                  }
                  label="Required"
                />
                <Tooltip title="Delete Question">
                  <IconButton onClick={() => handleDeleteQuestion(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Duplicate Question">
                  <IconButton onClick={() => handleDuplicateQuestion(index)}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Question">
                  <IconButton onClick={handleAddQuestion}>
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </div>
        ))}

        <Button title='Submit'  type='submit'>Submit</Button>
      </form>
    </div>
      </Box>
    </motion.div>
  );
}

const useStyles = makeStyles({
  customTextField: {
    '& input::placeholder': {
      fontSize: '20px',
    },
  },
});

const multipleQuestionChoice = [
  {
    name: 'Multiple Question',
    icon: <RadioButtonCheckedIcon />,
    value: 'radio',
  },
  {
    name: 'Checkboxes',
    icon: <CheckBoxIcon />,
    value: 'checkbox',
  },
  {
    name: 'Short Paragraph',
    icon: <SegmentIcon />,
    value: 'text',
  },
  {
    name: 'Long Paragraph',
    icon: <ViewHeadlineIcon />,
    value: 'textarea',
  },
  {
    name: 'Drop-down',
    icon: <ArrowDropDownCircleIcon />,
    value: 'select',
  },
  {
    name: 'Date',
    icon: <DateRangeIcon />,
    value: 'date',
  },
  {
    name: 'File Upload',
    icon: <CloudUploadIcon />,
    value: 'upload',
  },
];


export default App;
