import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';


class TodoList extends React.Component {

    state = {
      todoItems:[],
    displayType:"All"
    };



  addItem = (todoItem)=>{
    this.setState(
      function()
      {
        if(todoItem.text!=="")
        {
        return {todoItems:[todoItem,...this.state.todoItems]};
        }
      }
    );

  }
  onComplete = (todoItem) =>{
    this.setState(
      {
        todoItems: this.state.todoItems.map(function(todo)
      {
        if(todo.id===todoItem.id)
        {
          return {...todo,complete:!todo.complete};
        }
        else {
          {
            return todo;
          }
        }
      })
      }
    );

  }

  deleteTodoItem = (todoItem)=>{
    this.setState(
      {
        todoItems:this.state.todoItems.filter(function(todo){
          return todo.id!==todoItem.id;
        })
      }
    );

  }

  showTodoItems=(typeToDisplay)=>{
      this.setState(
        {
            displayType:typeToDisplay
        }
      );

  }



  render () {


    let todoItems=[];
    let totalItems;
    if(this.state.displayType==="All"){
      todoItems = this.state.todoItems;
      totalItems = todoItems.length;

    }

    else if(this.state.displayType==="Active"){
      todoItems = this.state.todoItems.filter(function(todoItem){
        return !todoItem.complete;
      })
      totalItems = todoItems.length;
    }

    else if(this.state.displayType==="Complete"){
      todoItems = this.state.todoItems.filter(function(todoItem){
        return todoItem.complete;
      })
      totalItems = todoItems.length;
    }

    return (
    <div style={{textAlign:"center", color: "fuchsia", marginRight:500, marginLeft:500, border: "5px solid deepskyblue" }}>

      <TodoForm onSubmit={this.addItem} />

      {todoItems.map((todoItem , idx)=>(
         <TodoItem
                key={todoItem.id}
                onComplete={()=>this.onComplete(todoItem)}
                deleteTodoItem={()=>this.deleteTodoItem(todoItem)}
                counter = {idx + 1}
                todoItem={todoItem}/>
      ))}
      <div >
      <button  style={{color: "purple"}} onClick={()=>this.showTodoItems("All")}>All</button>
      <button  style={{color: "orangered"}} onClick={()=>this.showTodoItems("Active")}>Active</button>
      <button  style={{color: "green"}} onClick={()=>this.showTodoItems("Complete")}>Complete</button>
      </div>
      <div >
      Total Items are: {totalItems}
      </div>
    </div>
  );
  }
}

export default TodoList;
