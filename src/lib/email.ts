import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTaskAssignmentEmail(
  assigneeEmail: string,
  creatorName: string,
  taskTitle: string,
  workspaceName: string,
  workspaceId: string,
  taskId: string
) {
  try {
    await resend.emails.send({
      from: "noreply@resend.dev",
      to: assigneeEmail,
      subject: `Se te asignó una tarea: "${taskTitle}"`,
      html: `
        <p>${creatorName} te asignó una tarea en <strong>${workspaceName}</strong>.</p>
        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/workspace/${workspaceId}/task/${taskId}" 
             style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
            VER TAREA
          </a>
        </p>
      `,
    });
  } catch (error) {
    console.error("Error sending task assignment email:", error);
  }
}

export async function sendWorkspaceInvitationEmail(
  receiverEmail: string,
  senderName: string,
  workspaceName: string
) {
  try {
    await resend.emails.send({
      from: "noreply@resend.dev",
      to: receiverEmail,
      subject: `Invitación a ${workspaceName}`,
      html: `
        <p>${senderName} te invitó a <strong>${workspaceName}</strong>.</p>
        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/invitations" 
             style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
            VER INVITACIÓN
          </a>
        </p>
      `,
    });
  } catch (error) {
    console.error("Error sending invitation email:", error);
  }
}