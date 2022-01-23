import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName: string;
  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: 'Eat mango', stage: 0 },
      { name: 'Have to read', stage: 1 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  createTask(taskName: any) {
    if(taskName.trim().length) {
      this.stagesTasks[0].push({ name: taskName, stage: 0 })
      this.taskName = '';
    }

  }

  task_back(superIndex, index) {
    const task = JSON.parse(JSON.stringify(this.stagesTasks[superIndex][index]));
    task['stage'] = task['stage'] - 1;
    this.stagesTasks[superIndex].splice(index, 1);
    this.stagesTasks[superIndex - 1].push(task);
  }

  task_forward(superIndex, index) {
    const task = JSON.parse(JSON.stringify(this.stagesTasks[superIndex][index]));
    task['stage'] = task['stage'] + 1;
    this.stagesTasks[superIndex].splice(index, 1);
    this.stagesTasks[superIndex + 1].push(task);
  }

  delteTask(superIndex, index) {
    this.stagesTasks[superIndex].splice(index, 1);
  }


}

interface Task {
  name: string;
  stage: number;
}
