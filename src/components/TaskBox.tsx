import React, { useState, useEffect, useCallback } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import styles from "./TaskBox.module.scss";
import AddIcon from "@material-ui/icons/Add";
import Slide from "@material-ui/core/Slide";
import NotificationsPausedIcon from "@material-ui/icons/NotificationsPaused";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useForm } from "react-hook-form";
import { GetTasks, TasksType } from "./../redux/TaskManagement/actions";
import { CreateTask, DeleteTask, UpdateTask } from "../Apis";
import { LoginType } from "../redux/Login/actions";
import dayjs from "dayjs";
import { GetSingleTask, TaskType } from "../redux/GetTask/actions";
import { content } from "../content";
import { TimeToSeconds } from "../utils/TimeToSeconds";
import { SecondsToTime } from "../utils/SecondsToTime";
import { UsersType } from "../redux/GetUsers/actions";

interface TaskItemProps {
  getTask: (id: string) => void;
  taskId: string;
  taskDescription: string;
  taskDate: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  getTask,
  taskId,
  taskDescription,
  taskDate,
}) => (
  <div className={styles.taskItem} key={taskId}>
    <div>
      <p>{taskDescription}</p>
      <small>{dayjs(taskDate).format("DD/MM/YYYY")}</small>
    </div>
    <div className={styles.taskItemButtons}>
      <button
        className={styles.taskEditButton}
        onClick={getTask.bind(this, taskId)}
      >
        <EditIcon />
      </button>
      <button>
        <NotificationsPausedIcon />
      </button>
      <button>
        <CheckIcon />
      </button>
    </div>
  </div>
);

interface FormFields {
  task_msg: string;
  task_date: string;
  task_time: string;
  assigned_user: string;
  id?: string;
}

interface Props {}

const TaskBox: React.FC<Props> = () => {
  const { register, handleSubmit, reset, watch } = useForm<FormFields>();

  const [taskBoxOpen, setTaskBoxOpen] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dispatch = useDispatch();

  const singleTask = useSelector(
    (state: { singleTaskReducer: TaskType }) => state.singleTaskReducer
  );

  useEffect(() => {
    if (singleTask.id) {
      reset({
        task_msg: singleTask.task_msg,
        task_date: singleTask.task_date,
        task_time: SecondsToTime(singleTask.task_time),
        assigned_user: singleTask.assigned_user,
        id: singleTask.id,
      });
      setIsEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleTask]);

  const allTasks = useSelector(
    (state: { allTasksReducer: TasksType }) => state.allTasksReducer
  );

  const allUsers = useSelector(
    (state: { allUsersReducer: UsersType }) => state.allUsersReducer
  );

  const loginDetails = useSelector(
    (state: { accessTokenReducer: LoginType }) => state.accessTokenReducer
  );

  const toggleTaskBox = () => setTaskBoxOpen((pre) => !pre);

  const handleTaskItemDispatch = (id: string) => {
    setTaskBoxOpen(true);
    dispatch(
      GetSingleTask(loginDetails.companyId, loginDetails.accessToken, id)
    );
  };

  const handleClearAll = () => {
    reset({
      task_msg: "",
      task_date: "",
      task_time: "",
      assigned_user: "",
    });
  };

  const onSubmit = useCallback(
    async (values: FormFields) => {
      const payload = {
        ...values,
        task_date: dayjs(values.task_date).format("YYYY-MM-DD"),
        task_time: TimeToSeconds(values.task_time),
        is_completed: 0,
        time_zone: 19800,
      };

      if (payload.id) {
        delete payload.id;
      }

      if (isEdit) {
        await UpdateTask(
          loginDetails.companyId,
          loginDetails.accessToken,
          payload,
          watch("id")
        );
        setIsEdit(false);
      } else {
        await CreateTask(
          loginDetails.companyId,
          loginDetails.accessToken,
          payload
        );
      }
      handleClearAll();
      setTaskBoxOpen(false);
      dispatch(GetTasks(loginDetails.companyId, loginDetails.accessToken));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEdit, loginDetails, watch]
  );

  return (
    <div className={styles.taskBoxMain}>
      <div className={styles.taskBoxHeader}>
        <p>
          {content.header} {allTasks.length}
        </p>
        <button onClick={toggleTaskBox}>
          <AddIcon />
        </button>
      </div>

      {!taskBoxOpen ? (
        allTasks.map((task) => (
          <Slide direction="right" in={!taskBoxOpen} mountOnEnter unmountOnExit>
            <div>
              <TaskItem
                taskId={task.id}
                getTask={handleTaskItemDispatch}
                taskDescription={task.task_msg}
                taskDate={task.task_date}
              />
            </div>
          </Slide>
        ))
      ) : (
        <Slide direction="right" in={taskBoxOpen} mountOnEnter unmountOnExit>
          <form
            className={styles.taskBoxContent}
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className={styles.fieldLabel} htmlFor="desc">
              {content.form.field1}
            </label>
            <input
              {...register("task_msg", { required: true })}
              id="desc"
              className={styles.inputField}
            />
            <div className={styles.taskBoxFlex}>
              <div>
                <label className={styles.fieldLabel} htmlFor="date">
                  {content.form.field2}
                </label>
                <input
                  {...register("task_date", { required: true })}
                  id="date"
                  className={styles.inputField}
                  type="date"
                />
              </div>
              <div>
                <label className={styles.fieldLabel} htmlFor="time">
                  {content.form.field3}
                </label>
                <input
                  {...register("task_time", { required: true })}
                  id="time"
                  className={styles.inputField}
                  type="time"
                  step="1"
                />
              </div>
            </div>
            <label className={styles.fieldLabel} htmlFor="assign_user">
              {content.form.field4}
            </label>
            <select
              {...register("assigned_user", { required: true })}
              id="assign_user"
              className={styles.inputField}
            >
              <option> </option>
              {(allUsers?.data || []).map((user, ind) => (
                <option key={user?.user_id || ind}>{user?.name}</option>
              ))}
            </select>
            <div
              className={`${styles.actionButtons} ${isEdit && styles.spaced}`}
            >
              {isEdit && (
                <button
                  className={styles.deleteButton}
                  onClick={() =>
                    DeleteTask(
                      loginDetails.companyId,
                      loginDetails.accessToken,
                      watch("id")
                    )
                  }
                >
                  <DeleteIcon />
                </button>
              )}
              <div className={styles.mainButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    toggleTaskBox();
                    handleClearAll();
                  }}
                >
                  {content.buttons.cancel}
                </button>
                <button className={styles.saveButton} type="submit">
                  {content.buttons.submit}
                </button>
              </div>
            </div>
          </form>
        </Slide>
      )}
    </div>
  );
};

export default connect(null, null)(TaskBox);
