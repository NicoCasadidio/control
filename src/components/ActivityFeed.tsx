import {
  CheckSquare2,
  MessageSquare,
  RotateCw,
  UserPlus,
  UserX,
} from "lucide-react";
import { ActivityType } from "@/generated/prisma/client";

type Activity = {
  id: string;
  type: ActivityType;
  createdAt: Date;
  taskTitle: string | null;
  actor: { name: string | null };
};

type Props = {
  activities: Activity[];
};

function getRelativeTime(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "hace unos segundos";
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `hace ${Math.floor(seconds / 86400)}d`;
  return `hace ${Math.floor(seconds / 604800)}w`;
}

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case "TASK_CREATED":
      return <CheckSquare2 className="w-5 h-5" />;
    case "COMMENT_ADDED":
      return <MessageSquare className="w-5 h-5" />;
    case "TASK_STATUS_CHANGED":
      return <RotateCw className="w-5 h-5" />;
    case "MEMBER_JOINED":
      return <UserPlus className="w-5 h-5" />;
    case "MEMBER_REMOVED":
      return <UserX className="w-5 h-5" />;
    default:
      return null;
  }
}

function getActivityColor(type: ActivityType): string {
  switch (type) {
    case "TASK_CREATED":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "COMMENT_ADDED":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "TASK_STATUS_CHANGED":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "MEMBER_JOINED":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    case "MEMBER_REMOVED":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  }
}

function getActivityAction(activity: Activity): string {
  const type = activity.type;

  switch (type) {
    case "TASK_CREATED":
      return "creó la tarea";
    case "COMMENT_ADDED":
      return "comentó en";
    case "TASK_STATUS_CHANGED":
      return "cambió el estado de";
    case "MEMBER_JOINED":
      return "se unió al workspace";
    case "MEMBER_REMOVED":
      return "abandonó el workspace";
    default:
      return "actividad";
  }
}

export default function ActivityFeed({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-6">
        <h2 className="text-lg font-bold text-[#f8fafc] mb-4">
          Actividad reciente
        </h2>
        <p className="text-[#94a3b8]">No hay actividad en los últimos 7 días.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] border border-[#1e293b] rounded-lg p-6">
      <h2 className="text-lg font-bold text-[#f8fafc] mb-6">
        Actividad reciente
      </h2>
      <ul className="space-y-4">
        {activities.map((activity) => {
          const actor = activity.actor.name ?? "Alguien";
          const action = getActivityAction(activity);
          const colorClass = getActivityColor(activity.type);
          const relativeTime = getRelativeTime(activity.createdAt);

          return (
            <li
              key={activity.id}
              className="flex gap-4 pb-4 border-b border-[#1e293b] last:border-b-0 last:pb-0"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center ${colorClass}`}
              >
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#f8fafc]">
                  <span className="font-bold">{actor}</span>
                  {" " + action + " "}
                  {activity.taskTitle && (
                    <span className="italic text-[#cbd5e1]">
                      "{activity.taskTitle}"
                    </span>
                  )}
                </p>
                <p className="text-sm text-[#94a3b8] mt-1">{relativeTime}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}