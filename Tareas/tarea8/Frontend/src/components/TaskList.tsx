//src\components\TaskList.tsx


import { TaskItem } from "./TaskItem";
import { EmptyTasksMessage } from "./EmptyTasksMessage";

// Definición de la estructura básica de una tarea
export interface Task {
  id: string;          // Identificador único de la tarea
  content: string;        // Texto descriptivo de la tarea
  active: boolean;  // Estado de la tarea: completada o no
}

// Props que recibe el componente TaskList
export interface Props {
  tasks: Task[];   // Lista de tareas que se van a mostrar
  tabId: string;   // ID de la pestaña a la que pertenecen estas tareas
  isLoading?: boolean; // Indicador de carga
}

/**
 * Componente TaskList
 * Se encarga de mostrar una lista de tareas.
 * Para cada tarea recibe un TaskItem, al que pasa las funciones para cambiar estado y eliminar.
 * Este componente es solo responsable de listar las tareas dentro de un contenedor <ul> con estilos.
 */
//export function TaskList({ tasks, tabId, onToggle, onDelete }: Props) {
export function TaskList({tasks, tabId, isLoading = false}: Props){

  // Si no hay tareas, mostrar el mensaje apropiado
  if (tasks.length === 0) {
    return <EmptyTasksMessage boardId={tabId} isLoading={isLoading} />;
  }

return (
    <ul className="task-list bg-[antiquewhite] p-5 rounded-lg mb-5 list-none">
      {/* Por cada tarea en el array, renderiza un TaskItem con sus props correspondientes */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}      // Key única para React
          task={task}        // La tarea en sí
          tabId={tabId}      // La pestaña a la que pertenece
          //onToggle={onToggle} // Función para marcar completada o pendiente
          //onDelete={onDelete} // Función para eliminar la tarea
        />
      ))}
    </ul>
  );
}
