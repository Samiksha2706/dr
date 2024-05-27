/*
import { http, HttpResponse } from 'msw';

// Define the tasks array with sample data
let tasks = [
  { id: 1, title: 'Buy groceries', description: 'Milk, bread, eggs', completed: false },
  { id: 2, title: 'Finish report', description: 'Due tomorrow', completed: true },
];

export const handlers = [
  // GET /api/tasks: Get all tasks
  http.get('/api/tasks', (req, res, ctx) => {
    return res(ctx.json(tasks));
  }),

  // POST /api/tasks: Create a new task
  http.post('/api/tasks', async (req, res, ctx) => {
    const newTask = await req.json();
    newTask.id = Math.max(0, ...tasks.map(task => task.id)) + 1;
    tasks.push(newTask);
    return res(ctx.json(newTask), ctx.status(201));
  }),

  // PUT /api/tasks/:id: Update an existing task
  http.put('/api/tasks/:id', async (req, res, ctx) => {
    const taskId = parseInt(req.params.id);
    const updatedTaskData = await req.json();

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return res(ctx.status(404));
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTaskData };
    return res(ctx.json(tasks[taskIndex]));
  }),

  // DELETE /api/tasks/:id: Delete a task
  http.delete('/api/tasks/:id', async (req, res, ctx) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
      return res(ctx.status(404));
    }

    tasks.splice(taskIndex, 1);
    return res(ctx.json({ message: 'Task deleted' }));
  }),
];*/

// new task - post request , edit - put request, mock - add task - post , put .
//working partially
import { http, HttpResponse } from 'msw';
console.log('handlers.js file executed. lol');

export const handlers = [

  http.get('/api/tasks', (resolver) => {
    return HttpResponse.json(tasks);
  }),
/*
  http.post('/api/tasks', async ({ request }) => {
    const newTask = await request.json(); // Parse the request body

    newTask.id = Math.max(0, ...tasks.map((task) => task.id)) + 1;

    tasks.push(newTask); 

    return HttpResponse.json(newTask, { status: 201 }); //
  }),*/

  // PUT /api/tasks/:id: Update an existing task
  
  http.put('http://localhost:8000/api/tasks/', async ({ request, params }) => {
    const taskId = parseInt(params.id);
    const updatedTaskData = await request.json();

    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return HttpResponse.notFound(); // Task not found
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTaskData }; // Update task data

    return HttpResponse.json(tasks[taskIndex]); // Return the updated task
    }),
 

  // DELETE /api/tasks/:id: Delete a task
 /*
  http.delete('/api/tasks/:id', async ({ request, params }) => {
    const taskId = parseInt(params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
  
    if (taskIndex === -1) {
      return HttpResponse.notFound(); 
    }
  
    tasks.splice(taskIndex, 1); 
  
    return HttpResponse.json({ message: 'Task deleted' }); 
  })*/
];

let tasks = [
  { id: 27, title: 'Buy groceries', description: 'Milk, bread, eggs', completed: false },
  { id: 2, title: 'Finish report', description: 'Due tomorrow', completed: true },
  { id: 25, title: 'assignment', description: 'Due tomorrow', completed: true },
];


/*
const handlers = [
  http.get('/api/tasks', (req, res, ctx) => {
    return http(ctx.json(tasks)); // Respond with the list of tasks
  }),
  http.post('/api/tasks', (req, res, ctx) => {
    const newTask = { ...req.body, id: faker.datatype.uuid() }; // Generate unique ID
    tasks.push(newTask);
    return res(ctx.json(newTask)); // Respond with the created task
  }),
  // Add handlers for other API endpoints as needed (PUT, DELETE)
];
*/
//export const mockServer = server(handlers); // Create mock server instance
/*
// Define request handlers
export const handlers = [
  // Handler for GET /api/tasks endpoint
  http.get("http://localhost:3000/api/tasks", (req, res, ctx) => {
    // Mock response data
    const tasks = [
      { id: 1, name: 'Task 1', description: 'Description 1', completed: false },
      { id: 2, name: 'Task 2', description: 'Description 2', completed: true }
    ];

    // Return a mock response with status 200 OK and the tasks data
    return http(
      ctx.status(200),
      ctx.json(tasks)
    );
  }),

  // Handler for POST /api/tasks endpoint
  http.post("http://localhost:3000/api/tasks", (req, res, ctx) => {
    // Extract task data from the request body
    const { name, description, completed } = req.body;
    
    // Generate a unique ID for the new task
    const id = Math.floor(Math.random() * 1000) + 1;
    
    // Return a mock response with status 201 Created and the created task data
    return hhtp(
      ctx.status(201),
      ctx.json({ id, name, description, completed })
    );
  }),

  // Add more request handlers as needed
];
*/
