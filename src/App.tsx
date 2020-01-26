import React, {useState, Dispatch, SetStateAction, ChangeEvent, SyntheticEvent} from 'react';
import { TodoProps, TodoListProps } from './App.d';
import { 
  CssBaseline, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Grid, 
  Checkbox,
  ListSubheader,
  createStyles,
  makeStyles,
  Theme,
  Container,
  TextField,
  IconButton,
  Icon,
  Divider,
  Card 
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  board: {
    marginTop: '10vh',
  },
  todoList: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(0),
    '&:first-of-type': {
      paddingLeft: theme.spacing(1)
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(0),
      '&:nth-child(-n+2)': {
        paddingTop: theme.spacing(1),
      }
    },
  },
  todoInputForm: {
    marginLeft: '10px'
  }
}))


const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <Board>
          <TodoList header='Frank'></TodoList>
          <TodoList header='Thomas'></TodoList>
          <TodoList header='Sally'></TodoList>
          <TodoList header='Joule'></TodoList>
        </Board>
      {/* </ThemeProvider> */}
    </div>
  );
}

const Board: React.FC = ({children}) => {
  const classes = useStyles();
  return <Container className={classes.board}>
    <Paper>
      <Grid container>
        {children}
      </Grid>
    </Paper>
  </Container>
}

const TodoList: React.FC<TodoListProps> = ({header}) => {
  const classes = useStyles();
  const [todo, setTodo]: [string, Dispatch<SetStateAction<string>>] = useState(() => '');

  const init: string[] = []
  const [items, setItems]: [string[], Dispatch<SetStateAction<string[]>>] = useState(() => init);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }

  function handleClick(e: SyntheticEvent) {
    setItems([...items, todo]);
    setTodo('');
  }

  return <Grid className={classes.todoList} item xs={12} md={6} lg={3}>
    <Paper>
      <Card>
        <List subheader={<ListSubheader disableSticky>{header}</ListSubheader>}>
          <Divider />
          {items.map((todo, i) => <Todo key={`todo_${i}`} description={todo}/>)}
          <Divider/>
          <ListItem className={classes.todoInputForm}>
            <ListItemText>
              <TextField variant='standard' fullWidth onChange={handleChange} value={todo}/>
            </ListItemText>
            <ListItemIcon onClick={handleClick}>
              <IconButton >
                <Icon>add</Icon>
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
      </Card>
    </Paper>
  </Grid>
}

const Todo: React.FC<TodoProps> = ({description}) => {
  return <ListItem button>
    <Checkbox color='primary'></Checkbox>
    {description}
  </ListItem>
}

export default App;
