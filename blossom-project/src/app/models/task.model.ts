import { TaskStatus } from "./enum/task-status.enum";

export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    showDetails?: boolean;
    status: TaskStatus;
}
