import React, { Component } from "react";
import Modal from "./Components/Modal";
import axios from 'axios'; 
import USE_MOCK from "./use_mock";
import './axiosinterpreter';
/*
const express = require("express");
const app = express();
const cors = require('cors');
*/
//import { Request } from "express";
//import cors from "cors";

//import axiosInstance from "./axio"
//import {USE_MOCK} from "./use_mock";


console.log("app.js is executed, it should check whether to use the original or mock API");
let App;
if (USE_MOCK) {

//app.listen(8000,() => console.log("server running on 3000"))
    console.log("mock api");
    App = class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                viewCompleted: false,
                activeItem: {
                    title: "",
                    description: "",
                    completed: false
                },

                taskList: []                    
            };
        }

        componentDidMount() {
            this.refreshList();
        }

        refreshList = () => {
            axios
                .get("/api/tasks")
                .then(res => this.setState({ taskList: res.data }))
                .catch(err => console.log(err));
        };

        displayCompleted = status => {
            this.setState({ viewCompleted: status });
        };

        renderTabList = () => {
            return (
                <div className="my-5 tab-list">
                    <span
                        onClick={() => this.displayCompleted(true)}
                        className={this.state.viewCompleted ? "active" : ""}
                    >
                        Completed
                    </span>
                    <span
                        onClick={() => this.displayCompleted(false)}
                        className={this.state.viewCompleted ? "" : "active"}
                    >
                        Incompleted
                    </span>
                </div>
            );
        };

        renderItems = () => {
            const { viewCompleted } = this.state;
            const newItems = this.state.taskList.filter(
                item => item.completed === viewCompleted
            );
            return newItems.map(item => (
                <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                >
                    <span
                        className={`todo-title mr-2 ${item.completed ? "completed-todo" : ""}`}
                        title={item.description}
                    >
                        {item.title}
                    </span>
                    <span>
                        <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2">
                            Edit
                        </button>
                        <button onClick={() => this.handleDelete(item)} className="btn btn-danger">
                            Delete
                        </button>
                    </span>
                </li>
            ));
        };

        toggle = () => {
            this.setState({ modal: !this.state.modal });

        };
		handleSubmit = (item) => {
			this.toggle();
			const newTasks = this.state.taskList.slice(); // Create a copy
		
			if (item.id) {
				axios.put(`/api/tasks/${item.id}`, item)
					.then((response) => {
						console.log('PUT request to mock server');
						this.setState({ taskList: newTasks });
					})
					.catch((error) => {
						console.log("Error during PUT request:", error);
						if (error.response && error.response.status === 404) {
							console.log('Error 404 detected in mock server');
							axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
								.then((response) => {
									console.log('Task updated successfully from original API:', response.data);
									this.setState({ taskList: newTasks });
								})
								.catch((error) => {
									console.log('Error updating task from original API:', error);
								});
						}
					});
			} 
			/*
			else {
				// Create new task object
				const newTask = { ...item };
				// Adding new tasks
				axios.post('/api/tasks', newTask)
					.then((response) => {
						console.log('Task created successfully:', response.data);
						this.setState({ taskList: newTasks });
					})
					.catch((error) => {
						console.error('Error creating task:', error);
					});
			}*/
		
		
		
/*
		handleSubmit = (item) => {
			this.toggle();
			alert("save" + JSON.stringify(item));
			const newTasks = this.state.taskList.slice(); // Create a copy
			if (item.id) {
				axios.put(`/api/tasks/${item.id}`, item)
					.then((response) => {
						console.log('PUT request to mock server');
						this.setState({ taskList: newTasks });
					}) 
					.catch((error) => {
						console.log("catch block")
						if (error.response && error.response.status === 404) {
							console.log('error 404 in mock server')
							// again trying with original API
							axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
							console.log("trying it with original API now")
								.then((response) => {
									console.log('Task updated successfully from handleSubmit from lh-8000:', response.data);
									this.setState({ taskList: newTasks });
									
								})
								.catch((error) => {
									console.log('Error updating task from both:', error);
								});
						}
					});
			} 
			*/else{  
				const newTaskId = Math.max(0, ...newTasks.map((task) => task.id)) + 1; // Generate unique ID
				const newTask = { ...item, id: newTaskId }; 
				newTasks.push(newTask);
		
				axios.post('/api/tasks', newTask) 
					.then((response) => {
						console.log('Task created successfully:', response.data);
						this.setState({ taskList: newTasks });
						// this.refreshList(); // Update displayed list (optional)
					})
					.catch((error) => {
						console.error('Error creating task:', error);
					});
			}
		}
		

        handleDelete = (item) => {
            axios.delete(`/api/tasks/${item.id}/`)
                .then((response) => {
                    console.log('Task deleted successfully:', response.data);
                    const updatedTaskList = this.state.taskList.filter(task => task.id !== item.id);
                    this.setState({ taskList: updatedTaskList });
                })
                .catch((error) => {
                    console.error('Error deleting task:', error);
                });
        };

        createItem = () => {
            const item = { title: "", description: "", completed: false };
            this.setState({ activeItem: item, modal: !this.state.modal });
        };

        editItem = item => {
            this.setState({ activeItem: item, modal: !this.state.modal });
        };

        render() {
            return (
                <main className="content">
                    <h1 className="text-success text-uppercase text-center my-4">
                        GFG Task Manager
                    </h1>
                    <div className="row ">
                        <div className="col-md-6 col-sm-10 mx-auto p-0">
                            <div className="card p-3">
                                <div className="">
                                    <button onClick={this.createItem} className="btn btn-info">
                                        Add Task
                                    </button>
                                </div>
                                {this.renderTabList()}
                                <ul className="list-group list-group-flush">
                                    {this.renderItems()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {this.state.modal ? (
                        <Modal
                            activeItem={this.state.activeItem}
                            toggle={this.toggle}
                            onSave={this.handleSubmit}
                        />
                    ) : null}
                </main>
            );
        }
    };
} else {
    console.log("original api");	
        
/*
if (USE_MOCK){ //till 193
    console.log("mock api")
    App = class extends Component {
        constructor(props) {
            super(props);
            this.state = {
              viewCompleted: false,
              activeItem: {
                title: "",
                description: "",
                completed: false
              },
            
              taskList: [
                { id: 1, title: "Buy groceries", description: "...", completed: false },
                { id: 2, title: "Finish report", description: "...", completed: true },
              ]
            };
          }
        
          componentDidMount() {
            this.refreshList();
          }
        
          refreshList = () => {
            axios
              .get("/api/tasks")
              .then(res => this.setState({ taskList: res.data }))
              .catch(err => console.log(err));
          };
        
          displayCompleted = status => {
            this.setState({ viewCompleted: status });
          };
        
          renderTabList = () => {
            return (
              <div className="my-5 tab-list">
                <span
                  onClick={() => this.displayCompleted(true)}
                  className={this.state.viewCompleted ? "active" : ""}
                >
                  Completed
                </span>
                <span
                  onClick={() => this.displayCompleted(false)}
                  className={this.state.viewCompleted ? "" : "active"}
                >
                  Incompleted
                </span>
              </div>
            );
          };
        
          renderItems = () => {
            const { viewCompleted } = this.state;
            const newItems = this.state.taskList.filter(
              item => item.completed === viewCompleted
            );
            return newItems.map(item => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span
                  className={`todo-title mr-2 ${item.completed ? "completed-todo" : ""}`}
                  title={item.description}
                >
                  {item.title}
                </span>
                <span>
                  <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2">
                    Edit
                  </button>
                  <button onClick={() => this.handleDelete(item)} className="btn btn-danger">
                    Delete
                  </button>
                </span>
              </li>
            ));
          };
        
          toggle = () => {
            this.setState({ modal: !this.state.modal });
          };

        // edit 

          handleSubmit = (item) => {
            this.toggle();
			alert("save" + JSON.stringify(item));
            const newTasks = this.state.taskList.slice(); // Create a copy
			if (USE_MOCK) {
				console.log('PUT request to mock server (for display purposes only)');
				axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
				  .then((response) => {
					if (response.status === 200) { // Success from mock server (optional display)
					  console.log('Task updated successfully on mock server (for display only):', response.data);
					} else {
					  console.error('Failed to update task on mock server (fallback to original API):', response.statusText);
					  // Fallback to original API on any non-200 status code
					  this.handleEditTask(item);
					}
				  })
				  .catch((error) => {
					console.error('Error updating task on mock server (fallback to original API):', error);
					// Fallback to original API on any error
					this.handleEditTask(item);
				  }); 
				/*
				if (USE_MOCK) {
					console.log('PUT request to mock server');
					axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
						.then((response) => {
							console.log('Task updated successfully from handleSubmit:', response.data);
							this.setState({ taskList: newTasks });
						})
						.catch((error) => {
							console.error('Error updating task:', error);
						});*/
				/*} else {
					// Make the request to the original API
					axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
						.then((response) => {
							console.log('Task updated successfully from handleSubmit:', response.data);
							this.setState({ taskList: newTasks });
						})
						.catch((error) => {
							console.error('Error updating task:', error);
						});
				}*/ /*
			} else {  // adding new tasks and takin value form user
				const newTaskId = Math.max(0, ...newTasks.map((task) => task.id)) + 1; // Generate unique ID
				const newTask = { ...item, id: newTaskId }; // Create new task object with ID
				newTasks.push(newTask);
		
				axios.post('/api/tasks', newTask) // Assuming your backend API endpoint for creating tasks
					.then((response) => {
						console.log('Task created successfully:', response.data);
						this.setState({ taskList: newTasks });
						// this.refreshList(); // Update displayed list (optional)
					})
					.catch((error) => {
						console.error('Error creating task:', error);
                  });        
            }*/
			 /*         
			axios.put(`/api/tasks/${item.id}`, item)
                
			.then((response) => {
			  console.log('Task updated successfully from handlesubmit:', response.data);
			  this.setState({ taskList: newTasks });
			  //this.refreshList(); // Update the displayed list (optional)
			})
			.catch((error) => {
			  console.error('Error updating task:', error);
			});
          };
		  handleEditTask = async (item) => {
			const { id } = item;
			const url = `http://localhost:8000/api/tasks/${id}/`; 
		  
			const options = {
				method: 'PUT',
				data: item,
			};
		  
			try {
				const response = await axios(url, options);
				console.log('Task updated successfully using original API:', response.data);
				this.setState({ taskList: response.data }); // Assuming the response contains updated task data
			} catch (error) {
				console.error('Failed to update task using original API:', error);
			}
		  };  

        
          handleDelete = (item) => {
            axios.delete(`/api/tasks/${item.id}/`)
              .then((response) => {
                console.log('Task deleted successfully:', response.data);
                // Update taskList state after successful deletion
                const updatedTaskList = this.state.taskList.filter(task => task.id !== item.id);
                this.setState({ taskList: updatedTaskList });
              })
              .catch((error) => {
                console.error('Error deleting task:', error);
              });
          };
        
          createItem = () => {
            const item = { title: "", description: "", completed: false };
            this.setState({ activeItem: item, modal: !this.state.modal });
          };
        
          editItem = item => {
            this.setState({ activeItem: item, modal: !this.state.modal });
          };
        
          render() {
            return (
              <main className="content">
                <h1 className="text-success text-uppercase text-center my-4">
                  GFG Task Manager
                </h1>
                <div className="row ">
                  <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                      <div className="">
                        <button onClick={this.createItem} className="btn btn-info">
                          Add Task
                        </button>
                      </div>
                      {this.renderTabList()}
                      <ul className="list-group list-group-flush">
                        {this.renderItems()}
                      </ul>
                    </div>
                  </div>
                </div>
                {this.state.modal ? (
                  <Modal
                    activeItem={this.state.activeItem}
                    toggle={this.toggle}
                    onSave={this.handleSubmit}
                  />
                ) : null}
              </main>
            );
          }
        }
        

}
*/

    App = class extends Component {

        // add a constructor to take props
        constructor(props) {
            super(props);
            
            // add the props here
            this.state = {
            
            // the viewCompleted prop represents the status
            // of the task. Set it to false by default
            viewCompleted: false,
            activeItem: {
                title: "",
                description: "",
                completed: false
            },
            
            // this list stores all the completed tasks
            taskList: []
            };
        }
        
        // Add componentDidMount()
        componentDidMount() {
            this.refreshList();
        }
        
        
        refreshList = () => {
            axios //Axios to send and receive HTTP requests
            .get("http://localhost:8000/api/tasks/")
            .then(res => this.setState({ taskList: res.data }))
            .catch(err => console.log(err));
        };
        
        // this arrow function takes status as a parameter
        // and changes the status of viewCompleted to true
        // if the status is true, else changes it to false
        displayCompleted = status => {
            if (status) {
            return this.setState({ viewCompleted: true });
            }
            return this.setState({ viewCompleted: false });
        };
        
        // this array function renders two spans that help control
        // the set of items to be displayed(ie, completed or incomplete)
        renderTabList = () => {
            return (
            <div className="my-5 tab-list">
                <span
                onClick={() => this.displayCompleted(true)}
                className={this.state.viewCompleted ? "active" : ""}
                >
                completed
                    </span>
                <span
                onClick={() => this.displayCompleted(false)}
                className={this.state.viewCompleted ? "" : "active"}
                >
                Incompleted
                    </span>
            </div>
            );
        };
        // Main variable to render items on the screen
        renderItems = () => {
            const { viewCompleted } = this.state;
            const newItems = this.state.taskList.filter(
            (item) => item.completed === viewCompleted
            );
            return newItems.map((item) => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                className={`todo-title mr-2 ${
                    this.state.viewCompleted ? "completed-todo" : ""
                }`}
                title={item.description}
                >
                {item.title}
                </span>
                <span>
                <button
                    onClick={() => this.editItem(item)}
                    className="btn btn-secondary mr-2"
                >
                    Edit
                </button>
                <button
                    onClick={() => this.handleDelete(item)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
                </span>
            </li>
            ));
        };
        
        toggle = () => {
            //add this after modal creation
            this.setState({ modal: !this.state.modal });
        };
        
        handleSubmit = (item) => {
            this.toggle();
            alert("save" + JSON.stringify(item));
            if (item.id) {

            axios
                .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
                .then((res) => this.refreshList());
            return;
            }
            // if new post to submit
            axios
            .post("http://localhost:8000/api/tasks/", item)
            .then((res) => this.refreshList());
        };
        
        // Delete item
        handleDelete = (item) => {
            alert("delete" + JSON.stringify(item));
            axios
            .delete(`http://localhost:8000/api/tasks/${item.id}/`)
            .then((res) => this.refreshList());
        };
        
        // Create item
        createItem = () => {
            const item = { title: "", description: "", completed: false };
            this.setState({ activeItem: item, modal: !this.state.modal });
        };
        
        //Edit item
        editItem = (item) => {
            this.setState({ activeItem: item, modal: !this.state.modal });
        };
        
        // Start by visual effects to viewer
        render() {
            return (
            <main className="content">
                <h1 className="text-success text-uppercase text-center my-4">
                GFG Task Manager
                </h1>
                <div className="row ">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                    <div className="">
                        <button onClick={this.createItem} className="btn btn-info">
                        Add task
                        </button>
                    </div>
                    {this.renderTabList()}
                    <ul className="list-group list-group-flush">
                        {this.renderItems()}
                    </ul>
                    </div>
                </div>
                </div>
                {this.state.modal ? (
                <Modal
                    activeItem={this.state.activeItem}
                    toggle={this.toggle}
                    onSave={this.handleSubmit}
                />
                ) : null}
            </main>
            );
        }
        }
}
export default App;

/*
// import Component from the react module
import React, { Component } from "react";
import Modal from "./Components/Modal";
import axios from 'axios'; 

import { USE_MOCK } from "./use_mock";

console.log('app.js executed.');

// create a class that extends the component
class App extends Component {

// add a constructor to take props
constructor(props) {
	super(props);
	
	// add the props here
	this.state = {
	
	// the viewCompleted prop represents the status
	// of the task. Set it to false by default
	viewCompleted: false,
	activeItem: {
		title: "",
		description: "",
		completed: false
	},
	
	// this list stores all the completed tasks
	taskList: []
	};
}

// Add componentDidMount()
componentDidMount() {
	this.refreshList();
}


refreshList = () => {
	axios //Axios to send and receive HTTP requests
	.get("http://localhost:8000/api/tasks/")
	.then(res => this.setState({ taskList: res.data }))
	.catch(err => console.log(err));
};

// this arrow function takes status as a parameter
// and changes the status of viewCompleted to true
// if the status is true, else changes it to false
displayCompleted = status => {
	if (status) {
	return this.setState({ viewCompleted: true });
	}
	return this.setState({ viewCompleted: false });
};

// this array function renders two spans that help control
// the set of items to be displayed(ie, completed or incomplete)
renderTabList = () => {
	return (
	<div className="my-5 tab-list">
		<span
		onClick={() => this.displayCompleted(true)}
		className={this.state.viewCompleted ? "active" : ""}
		>
		completed
			</span>
		<span
		onClick={() => this.displayCompleted(false)}
		className={this.state.viewCompleted ? "" : "active"}
		>
		Incompleted
			</span>
	</div>
	);
};
// Main variable to render items on the screen
renderItems = () => {
	const { viewCompleted } = this.state;
	const newItems = this.state.taskList.filter(
	(item) => item.completed === viewCompleted
	);
	return newItems.map((item) => (
	<li
		key={item.id}
		className="list-group-item d-flex justify-content-between align-items-center"
	>
		<span
		className={`todo-title mr-2 ${
			this.state.viewCompleted ? "completed-todo" : ""
		}`}
		title={item.description}
		>
		{item.title}
		</span>
		<span>
		<button
			onClick={() => this.editItem(item)}
			className="btn btn-secondary mr-2"
		>
			Edit
		</button>
		<button
			onClick={() => this.handleDelete(item)}
			className="btn btn-danger"
		>
			Delete
		</button>
		</span>
	</li>
	));
};

toggle = () => {
	//add this after modal creation
	this.setState({ modal: !this.state.modal });
};


// Submit an item
handleSubmit = (item) => {
	this.toggle();
	alert("save" + JSON.stringify(item));
	if (item.id) {
	// if old post to edit and submit
	axios
		.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
		.then((res) => this.refreshList());
	return;
	}
	// if new post to submit
	axios
	.post("http://localhost:8000/api/tasks/", item)
	.then((res) => this.refreshList());
};

// Delete item
handleDelete = (item) => {
	alert("delete" + JSON.stringify(item));
	axios
	.delete(`http://localhost:8000/api/tasks/${item.id}/`)
	.then((res) => this.refreshList());
};

// Create item
createItem = () => {
	const item = { title: "", description: "", completed: false };
	this.setState({ activeItem: item, modal: !this.state.modal });
};

//Edit item
editItem = (item) => {
	this.setState({ activeItem: item, modal: !this.state.modal });
};

// Start by visual effects to viewer
render() {
	return (
	<main className="content">
		<h1 className="text-success text-uppercase text-center my-4">
		GFG Task Manager
		</h1>
		<div className="row ">
		<div className="col-md-6 col-sm-10 mx-auto p-0">
			<div className="card p-3">
			<div className="">
				<button onClick={this.createItem} className="btn btn-info">
				Add task
				</button>
			</div>
			{this.renderTabList()}
			<ul className="list-group list-group-flush">
				{this.renderItems()}
			</ul>
			</div>
		</div>
		</div>
		{this.state.modal ? (
		<Modal
			activeItem={this.state.activeItem}
			toggle={this.toggle}
			onSave={this.handleSubmit}
		/>
		) : null}
	</main>
	);
}
}
export default App;
*/
