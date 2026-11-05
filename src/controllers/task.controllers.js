
const tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Learn Express", completed: false }
];

export function getAllTasks(req, res) {
  res.json({
    success: true,
    data: tasks
  });
}

export function getTaskById(req, res) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID"
    });
  }

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  res.json({
    success: true,
    data: task
  });
}

export function createTask(req, res) {
  const { title, completed = false } = req.body ?? {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required"
    });
  }

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Completed must be a boolean"
    });
  }

  const task = {
    id: Math.max(0, ...tasks.map(t => t.id)) + 1,
    title: title.trim(),
    completed
  };

  tasks.push(task);

  res.status(201).json({
    success: true,
    data: task
  });
}


export function updateTask(req, res) {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid task ID"
    });
  }

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const body = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return res.status(400).json({
      message: "Invalid request body"
    });
  }

  const allowedFields = ["title", "completed"];

  const fields = Object.keys(body);

  if (
    fields.length === 0 ||
    fields.some(field => !allowedFields.includes(field))
  ) {
    return res.status(400).json({
      message: "Invalid update fields"
    });
  }

  const { title, completed } = body;

  if (
    (title !== undefined &&
      (typeof title !== "string" || !title.trim())) ||
    (completed !== undefined &&
      typeof completed !== "boolean")
  ) {
    return res.status(400).json({
      message: "Invalid task values"
    });
  }

  if (title !== undefined) {
    task.title = title.trim();
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json({
    success: true,
    data: task
  });
}
    
